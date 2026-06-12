import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        const API = import.meta.env.VITE_API_URL;
        Promise.all([
            fetch(`${API}/api/products/`).then(r => r.json()),
            fetch(`${API}/api/categories/`).then(r => r.json()),
        ])
            .then(([prods, cats]) => { setProducts(prods); setCategories(cats); setLoading(false); })
            .catch(err => { setError(err.message); setLoading(false); });
    }, []);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            return [...prev, { ...product, quantity: 1 }];
        });
        setNotification(`${product.name} added to cart!`);
        setTimeout(() => setNotification(null), 2500);
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

    const changeQuantity = (id, qty) => {
        if (qty < 1) return removeFromCart(id);
        setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    };

    const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

    const filtered = products.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = selectedCategory === "all" || p.category === parseInt(selectedCategory);
        return matchSearch && matchCat;
    });

    if (loading) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
            <div style={{ textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", border: "4px solid #e5e7eb", borderTop: "4px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 1rem" }} />
                <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Loading products...</p>
            </div>
        </div>
    );

    if (error) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#ef4444", fontSize: "1.1rem" }}>⚠️ {error}</p>
        </div>
    );

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", fontFamily: "'Inter', sans-serif" }}>
            <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

            {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQuantityChange={changeQuantity} />}

            {/* Notification */}
            {notification && (
                <div style={{ position: "fixed", top: "80px", right: "20px", backgroundColor: "#10b981", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "10px", zIndex: 2000, fontWeight: "500", boxShadow: "0 4px 16px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    ✅ {notification}
                </div>
            )}

            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)", padding: "4rem 2rem", textAlign: "center", color: "#fff" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "800", margin: "0 0 1rem" }}>Discover Amazing Products</h1>
                <p style={{ fontSize: "1.1rem", opacity: 0.85, margin: "0 0 2rem" }}>Shop the best deals on top products</p>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products..."
                    style={{ width: "100%", maxWidth: "500px", padding: "0.85rem 1.5rem", borderRadius: "50px", border: "none", fontSize: "1rem", outline: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
                />
            </div>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>

                {/* Category Filter */}
                <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                    <button
                        onClick={() => setSelectedCategory("all")}
                        style={{ padding: "0.5rem 1.2rem", borderRadius: "50px", border: "2px solid", borderColor: selectedCategory === "all" ? "#3b82f6" : "#e5e7eb", backgroundColor: selectedCategory === "all" ? "#3b82f6" : "#fff", color: selectedCategory === "all" ? "#fff" : "#374151", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}
                    >All</button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(String(cat.id))}
                            style={{ padding: "0.5rem 1.2rem", borderRadius: "50px", border: "2px solid", borderColor: selectedCategory === String(cat.id) ? "#3b82f6" : "#e5e7eb", backgroundColor: selectedCategory === String(cat.id) ? "#3b82f6" : "#fff", color: selectedCategory === String(cat.id) ? "#fff" : "#374151", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}
                        >{cat.name}</button>
                    ))}
                </div>

                {/* Results count */}
                <p style={{ color: "#6b7280", marginBottom: "1.5rem", fontSize: "0.95rem" }}>{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

                {/* Product Grid */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "4rem 0", color: "#6b7280" }}>
                        <p style={{ fontSize: "3rem" }}>🔍</p>
                        <p style={{ fontSize: "1.1rem" }}>No products found</p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.5rem" }}>
                        {filtered.map(product => (
                            <div key={product.id}
                                style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column" }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)"; }}
                            >
                                <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                                    <div style={{ width: "100%", height: "220px", backgroundColor: "#f3f4f6", overflow: "hidden" }}>
                                        {product.image
                                            ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} />
                                            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>📦</div>}
                                    </div>
                                </Link>

                                <div style={{ padding: "1.2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                                    <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                                        <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#111827", margin: "0 0 0.4rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h3>
                                    </Link>
                                    <p style={{ fontSize: "0.85rem", color: "#6b7280", margin: "0 0 1rem", flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.description}</p>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: "1.3rem", fontWeight: "800", color: "#111827" }}>${parseFloat(product.price).toFixed(2)}</span>
                                        <button
                                            onClick={() => addToCart(product)}
                                            style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", padding: "0.55rem 1.1rem", fontSize: "0.88rem", cursor: "pointer", fontWeight: "600" }}
                                            onMouseEnter={e => e.target.style.backgroundColor = "#2563eb"}
                                            onMouseLeave={e => e.target.style.backgroundColor = "#3b82f6"}
                                        >+ Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer style={{ backgroundColor: "#111827", color: "#9ca3af", textAlign: "center", padding: "2rem", marginTop: "4rem", fontSize: "0.9rem" }}>
                © {new Date().getFullYear()} ShopEasy. All rights reserved.
            </footer>
        </div>
    );
}

export default ProductList;
