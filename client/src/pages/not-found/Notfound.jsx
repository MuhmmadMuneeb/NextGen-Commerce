import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NotFound = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ textAlign: "center", maxWidth: "480px" }}>

                {/* Animated 404 illustration */}
                <div style={{
                    width: "120px", height: "120px", borderRadius: "50%",
                    background: "#faeeda", display: "flex", alignItems: "center",
                    justifyContent: "center", margin: "0 auto 1.5rem",
                    animation: "float 3s ease-in-out infinite"
                }}>
                    <span style={{ fontSize: "48px" }}>🛒</span>
                </div>

                <p style={{ fontSize: "13px", fontWeight: 500, color: "#9ca3af", letterSpacing: "0.08em", margin: "0 0 0.5rem" }}>
                    ERROR 404
                </p>
                <h1 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 0.75rem" }}>
                    This page went shopping
                </h1>
                <p style={{ fontSize: "15px", color: "#6b7280", margin: "0 0 2rem", lineHeight: 1.6 }}>
                    The page you're looking for has left the store. It may have moved, been deleted, or never existed.
                </p>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                    <button onClick={() => navigate("/shop")}
                        style={{ padding: "11px 24px", borderRadius: "8px", border: "1px solid #d1d5db", background: "transparent", cursor: "pointer", fontSize: "14px", fontWeight: 500 }}>
                        Go home
                    </button>
                    <button onClick={() => navigate("/shop/listing")}
                        style={{ padding: "11px 24px", borderRadius: "8px", border: "none", background: "#111827", color: "white", cursor: "pointer", fontSize: "14px", fontWeight: 500 }}>
                        Browse products
                    </button>
                </div>

                {/* Search */}
                <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "0.75rem" }}>Or search for what you need</p>
                <div style={{ display: "flex", gap: "8px", maxWidth: "320px", margin: "0 auto" }}>
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && navigate(`/shop?search=${query}`)}
                        placeholder="Search products..."
                        style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px" }}
                    />
                    <button onClick={() => navigate(`/shop?search=${query}`)}
                        style={{ padding: "10px 16px", borderRadius: "8px", background: "#111827", color: "white", border: "none", cursor: "pointer", fontSize: "14px" }}>
                        Search
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
            `}</style>
        </div>
    );
};

export default NotFound;