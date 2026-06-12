import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const API = import.meta.env.VITE_API_URL;
        fetch(`${API}/api/products/${id}/`)
            .then(r => r.json())
            .then(data => { setProduct(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id]);

    const addToCart = () => {
        if (!product) return;
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
            return [...prev, { ...product, quantity }];
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

    if (loading) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#6b7280" }}>Loading...</p>
        </div>
    );

    if (!product) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#ef4444" }}>Product not found.</p>
        </div>
    );

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", fontFamily: "'Inter', sans-serif" }}>
            <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
            {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQuantityChange={changeQuantity} />}

            {notification && (
                <div style={{ position: "fixed", top: "80px", right: "20px", backgroundColor: "#10b981", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "10px", zIndex: 2000, fontWeight: "500", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                    ✅ {notification}
                </div>
            )}

            <div style={{ maxWidth: "1000px", margin: "2rem auto", padding: "0 2rem" }}>
                <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: "0.95rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    ← Back
                </button>

                <div style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
                    {/* Image */}
                    <div style={{ height: "450px", backgroundColor: "#f3f4f6", overflow: "hidden" }}>
                        {product.image
                            ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "6rem" }}>📦</div>}
                    </div>

                    {/* Info */}
                    <div style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h1 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#111827", margin: "0 0 1rem" }}>{product.name}</h1>
                        <p style={{ color: "#6b7280", fontSize: "1rem", lineHeight: "1.7", margin: "0 0 2rem" }}>{product.description}</p>
                        <p style={{ fontSize: "2rem", fontWeight: "800", color: "#3b82f6", margin: "0 0 1.5rem" }}>${parseFloat(product.price).toFixed(2)}</p>

                        {/* Quantity */}
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                            <span style={{ fontWeight: "600", color: "#374151" }}>Quantity:</span>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "0.3rem 0.75rem" }}>
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#374151" }}>−</button>
                                <span style={{ fontWeight: "700", minWidth: "24px", textAlign: "center" }}>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#374151" }}>+</button>
                            </div>
                        </div>

                        <button
                            onClick={addToCart}
                            style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "12px", padding: "1rem", fontSize: "1rem", fontWeight: "700", cursor: "pointer", width: "100%" }}
                            onMouseEnter={e => e.target.style.backgroundColor = "#2563eb"}
                            onMouseLeave={e => e.target.style.backgroundColor = "#3b82f6"}
                        >
                            🛒 Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
