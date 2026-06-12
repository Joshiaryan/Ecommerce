import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartCount = 0, onCartClick }) {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("access");

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
    };

    return (
        <nav style={{ backgroundColor: "#111827", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
            <Link to="/" style={{ color: "#fff", fontSize: "1.4rem", fontWeight: "800", textDecoration: "none" }}>
                🛍️ ShopEasy
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Link to="/" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.95rem", fontWeight: "500" }}>Home</Link>

                {isLoggedIn ? (
                    <>
                        <Link to="/profile" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.95rem", fontWeight: "500" }}>👤 Profile</Link>
                        <button onClick={handleLogout} style={{ backgroundColor: "transparent", color: "#d1d5db", border: "1px solid #374151", borderRadius: "8px", padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.9rem" }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: "#d1d5db", textDecoration: "none", fontSize: "0.95rem" }}>Login</Link>
                        <Link to="/signup" style={{ backgroundColor: "#3b82f6", color: "#fff", textDecoration: "none", borderRadius: "8px", padding: "0.4rem 1rem", fontSize: "0.9rem", fontWeight: "600" }}>Sign Up</Link>
                    </>
                )}

                <button onClick={onCartClick} style={{ backgroundColor: "#1f2937", color: "#fff", border: "1px solid #374151", borderRadius: "8px", padding: "0.5rem 1rem", fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    🛒
                    {cartCount > 0 && (
                        <span style={{ backgroundColor: "#ef4444", color: "#fff", borderRadius: "50%", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: "bold" }}>
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
