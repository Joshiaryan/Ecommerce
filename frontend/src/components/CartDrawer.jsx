import { useNavigate } from "react-router-dom";

function CartDrawer({ cart, onClose, onRemove, onQuantityChange }) {
    const navigate = useNavigate();
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <>
            {/* Overlay */}
            <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 1100 }} />

            {/* Drawer */}
            <div style={{ position: "fixed", top: 0, right: 0, width: "380px", height: "100vh", backgroundColor: "#fff", zIndex: 1200, display: "flex", flexDirection: "column", boxShadow: "-4px 0 24px rgba(0,0,0,0.15)" }}>

                {/* Header */}
                <div style={{ padding: "1.5rem", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700", color: "#111827" }}>🛒 Your Cart ({cart.length})</h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#6b7280" }}>✕</button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: "center", marginTop: "4rem", color: "#6b7280" }}>
                            <p style={{ fontSize: "3rem" }}>🛒</p>
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid #f3f4f6", alignItems: "center" }}>
                                <div style={{ width: "60px", height: "60px", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f3f4f6", flexShrink: 0 }}>
                                    {item.image ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>📦</div>}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: "0 0 0.3rem", fontWeight: "600", fontSize: "0.9rem", color: "#111827" }}>{item.name}</p>
                                    <p style={{ margin: "0 0 0.5rem", color: "#3b82f6", fontWeight: "700" }}>${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#f9fafb", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                                        <span style={{ fontWeight: "600", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                                        <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid #e5e7eb", background: "#f9fafb", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => onRemove(item.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "1.1rem" }}>🗑️</button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div style={{ padding: "1.5rem", borderTop: "1px solid #e5e7eb" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                            <span style={{ fontWeight: "600", color: "#374151" }}>Total</span>
                            <span style={{ fontWeight: "800", fontSize: "1.2rem", color: "#111827" }}>${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => { onClose(); navigate("/checkout"); }}
                            style={{ width: "100%", padding: "0.85rem", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: "700", cursor: "pointer" }}
                        >
                            Proceed to Checkout →
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartDrawer;
