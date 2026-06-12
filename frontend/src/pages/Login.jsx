import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Invalid credentials");
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" }}>
            {/* Left Panel */}
            <div style={{ flex: 1, background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: "3rem" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "800", margin: "0 0 1rem" }}>🛍️ ShopEasy</h1>
                <p style={{ fontSize: "1.1rem", opacity: 0.85, textAlign: "center", maxWidth: "300px" }}>Your one-stop shop for the best products at unbeatable prices.</p>
            </div>

            {/* Right Panel */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f9fafb", padding: "2rem" }}>
                <div style={{ width: "100%", maxWidth: "400px" }}>
                    <h2 style={{ fontSize: "2rem", fontWeight: "800", color: "#111827", margin: "0 0 0.5rem" }}>Welcome back</h2>
                    <p style={{ color: "#6b7280", margin: "0 0 2rem" }}>Sign in to your account</p>

                    {error && (
                        <div style={{ backgroundColor: "#fee2e2", color: "#dc2626", padding: "0.85rem 1rem", borderRadius: "10px", marginBottom: "1.5rem", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {[{ label: "Username", name: "username", type: "text", placeholder: "Enter your username" },
                          { label: "Password", name: "password", type: "password", placeholder: "Enter your password" }].map(field => (
                            <div key={field.name} style={{ marginBottom: "1.2rem" }}>
                                <label style={{ display: "block", marginBottom: "0.4rem", color: "#374151", fontWeight: "600", fontSize: "0.9rem" }}>{field.label}</label>
                                <input
                                    name={field.name}
                                    type={field.type}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    required
                                    placeholder={field.placeholder}
                                    style={{ width: "100%", padding: "0.85rem 1rem", borderRadius: "10px", border: "1.5px solid #e5e7eb", fontSize: "1rem", outline: "none", boxSizing: "border-box", backgroundColor: "#fff" }}
                                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                                    onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ width: "100%", padding: "0.9rem", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1rem", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "0.5rem" }}
                        >
                            {loading ? "Signing in..." : "Sign In →"}
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#6b7280", fontSize: "0.95rem" }}>
                        Don't have an account?{" "}
                        <Link to="/signup" style={{ color: "#3b82f6", fontWeight: "700", textDecoration: "none" }}>Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
