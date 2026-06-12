import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ email: "", phone: "", address: "" });
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");

    const token = localStorage.getItem("access");

    useEffect(() => {
        if (!token) { navigate("/login"); return; }
        Promise.all([
            fetch("http://127.0.0.1:8000/api/profile/", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
            fetch("http://127.0.0.1:8000/api/orders/", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        ]).then(([userData, ordersData]) => {
            setUser(userData);
            setOrders(ordersData);
            setForm({ email: userData.email || "", phone: userData.profile?.phone || "", address: userData.profile?.address || "" });
            setLoading(false);
        }).catch(() => { navigate("/login"); });
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const res = await fetch("http://127.0.0.1:8000/api/profile/update/", {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) { setUser(data); setEditing(false); setSuccess(true); setTimeout(() => setSuccess(false), 3000); }
        setSaving(false);
    };

    const handleLogout = () => { localStorage.removeItem("access"); localStorage.removeItem("refresh"); navigate("/login"); };

    if (loading) return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb" }}>
            <p style={{ color: "#6b7280" }}>Loading profile...</p>
        </div>
    );

    const tabStyle = (tab) => ({
        padding: "0.75rem 1.5rem", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "0.95rem",
        backgroundColor: "transparent", borderBottom: activeTab === tab ? "3px solid #3b82f6" : "3px solid transparent",
        color: activeTab === tab ? "#3b82f6" : "#6b7280",
    });

    const inputStyle = { width: "100%", padding: "0.85rem 1rem", borderRadius: "10px", border: "1.5px solid #e5e7eb", fontSize: "1rem", outline: "none", boxSizing: "border-box", backgroundColor: editing ? "#fff" : "#f9fafb" };

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb", fontFamily: "'Inter', sans-serif" }}>
            <Navbar cartCount={0} onCartClick={() => navigate("/")} />

            {success && (
                <div style={{ position: "fixed", top: "80px", right: "20px", backgroundColor: "#10b981", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "10px", zIndex: 2000, fontWeight: "500", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                    ✅ Profile updated successfully!
                </div>
            )}

            <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1.5rem" }}>

                {/* Profile Header */}
                <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <div style={{ width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "#fff", fontWeight: "800", flexShrink: 0 }}>
                        {user?.username?.[0]?.toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ margin: "0 0 0.25rem", fontSize: "1.5rem", fontWeight: "800", color: "#111827" }}>@{user?.username}</h1>
                        <p style={{ margin: 0, color: "#6b7280", fontSize: "0.95rem" }}>{user?.email}</p>
                    </div>
                    <button onClick={handleLogout} style={{ backgroundColor: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "10px", padding: "0.6rem 1.2rem", cursor: "pointer", fontWeight: "600", fontSize: "0.9rem" }}>
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" }}>
                    <div style={{ borderBottom: "1px solid #e5e7eb", display: "flex" }}>
                        <button style={tabStyle("profile")} onClick={() => setActiveTab("profile")}>👤 Profile</button>
                        <button style={tabStyle("orders")} onClick={() => setActiveTab("orders")}>📦 Orders ({orders.length})</button>
                    </div>

                    <div style={{ padding: "2rem" }}>

                        {/* Profile Tab */}
                        {activeTab === "profile" && (
                            <form onSubmit={handleSave}>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "600", color: "#374151", fontSize: "0.9rem" }}>Username</label>
                                        <input value={user?.username || ""} disabled style={{ ...inputStyle, backgroundColor: "#f3f4f6", color: "#9ca3af" }} />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "600", color: "#374151", fontSize: "0.9rem" }}>Email</label>
                                        <input
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            disabled={!editing}
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = "#3b82f6"}
                                            onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "600", color: "#374151", fontSize: "0.9rem" }}>Phone</label>
                                        <input
                                            value={form.phone}
                                            onChange={e => setForm({ ...form, phone: e.target.value })}
                                            disabled={!editing}
                                            placeholder="Enter phone number"
                                            style={inputStyle}
                                            onFocus={e => e.target.style.borderColor = "#3b82f6"}
                                            onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                                        />
                                    </div>
                                </div>
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.4rem", fontWeight: "600", color: "#374151", fontSize: "0.9rem" }}>Address</label>
                                    <textarea
                                        value={form.address}
                                        onChange={e => setForm({ ...form, address: e.target.value })}
                                        disabled={!editing}
                                        placeholder="Enter your address"
                                        rows={3}
                                        style={{ ...inputStyle, resize: "vertical" }}
                                        onFocus={e => e.target.style.borderColor = "#3b82f6"}
                                        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                                    />
                                </div>

                                <div style={{ display: "flex", gap: "1rem" }}>
                                    {!editing ? (
                                        <button type="button" onClick={() => setEditing(true)} style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", padding: "0.75rem 2rem", fontWeight: "700", cursor: "pointer", fontSize: "0.95rem" }}>
                                            ✏️ Edit Profile
                                        </button>
                                    ) : (
                                        <>
                                            <button type="submit" disabled={saving} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "10px", padding: "0.75rem 2rem", fontWeight: "700", cursor: "pointer", fontSize: "0.95rem" }}>
                                                {saving ? "Saving..." : "💾 Save Changes"}
                                            </button>
                                            <button type="button" onClick={() => setEditing(false)} style={{ backgroundColor: "#f3f4f6", color: "#374151", border: "none", borderRadius: "10px", padding: "0.75rem 2rem", fontWeight: "700", cursor: "pointer", fontSize: "0.95rem" }}>
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                </div>
                            </form>
                        )}

                        {/* Orders Tab */}
                        {activeTab === "orders" && (
                            <div>
                                {orders.length === 0 ? (
                                    <div style={{ textAlign: "center", padding: "3rem 0", color: "#6b7280" }}>
                                        <p style={{ fontSize: "3rem" }}>📦</p>
                                        <p style={{ fontSize: "1.1rem" }}>No orders yet</p>
                                        <button onClick={() => navigate("/")} style={{ backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", padding: "0.75rem 2rem", cursor: "pointer", fontWeight: "600", marginTop: "1rem" }}>
                                            Start Shopping
                                        </button>
                                    </div>
                                ) : (
                                    orders.map(order => (
                                        <div key={order.id} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                                <div>
                                                    <span style={{ fontWeight: "700", color: "#111827" }}>Order #{order.id}</span>
                                                    <span style={{ marginLeft: "1rem", color: "#6b7280", fontSize: "0.85rem" }}>{new Date(order.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                                                    <span style={{ backgroundColor: "#dbeafe", color: "#1d4ed8", padding: "0.3rem 0.75rem", borderRadius: "50px", fontSize: "0.8rem", fontWeight: "600" }}>{order.payment_method}</span>
                                                    <span style={{ fontWeight: "800", color: "#111827", fontSize: "1.1rem" }}>${parseFloat(order.total_amount).toFixed(2)}</span>
                                                </div>
                                            </div>
                                            <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: "0.75rem" }}>
                                                {order.items.map((item, i) => (
                                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0", fontSize: "0.9rem" }}>
                                                        <span style={{ color: "#374151" }}>{item.product} × {item.quantity}</span>
                                                        <span style={{ color: "#6b7280" }}>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
