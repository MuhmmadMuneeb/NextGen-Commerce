import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/store/stripe-slice/index";

const Success = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearCart());
    }, []);

    return (
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "3rem 1.5rem", textAlign: "center" }}>

            {/* Success icon */}
            <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                background: "#f0fdf4", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 1.5rem"
            }}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <polyline points="7,18 15,26 29,10" stroke="#16a34a"
                        strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <h1 style={{ fontSize: "22px", fontWeight: 500, marginBottom: "0.5rem" }}>
                Payment successful
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
                Your order has been placed and is being processed.
            </p>

            {/* Order card */}
            <div style={{
                background: "#f9fafb", borderRadius: "12px",
                padding: "1.25rem 1.5rem", marginBottom: "2rem", textAlign: "left"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ color: "#6b7280", fontSize: "14px" }}>Status</span>
                    <span style={{
                        fontSize: "13px", fontWeight: 500, background: "#dcfce7",
                        color: "#16a34a", padding: "3px 10px", borderRadius: "999px"
                    }}>Paid</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #e5e7eb" }}>
                    <span style={{ color: "#6b7280", fontSize: "14px" }}>Payment method</span>
                    <span style={{ fontWeight: 500 }}>Card</span>
                </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button onClick={() => navigate("/shop/home")}
                    style={{
                        padding: "12px 28px", borderRadius: "8px", cursor: "pointer",
                        border: "1px solid #d1d5db", background: "transparent", fontSize: "15px"
                    }}>
                    Continue shopping
                </button>
                <button onClick={() => navigate("/orders")}
                    style={{
                        padding: "12px 28px", borderRadius: "8px", cursor: "pointer",
                        background: "#111827", color: "white", border: "none", fontSize: "15px"
                    }}>
                    View orders
                </button>
            </div>
        </div>
    );
};

export default Success;