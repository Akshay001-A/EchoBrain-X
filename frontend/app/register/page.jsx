"use client";

import { useState } from "react";
import { registerUser } from "../../src/services/authService";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] =
        useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response =
                await registerUser(formData);

            setMessage(
                response.message ||
                "Registration Successful"
            );

            setMessageType("success");

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            setMessage(
                error?.response?.data?.message ||
                "Registration Failed"
            );

            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(to bottom right,#eef2ff,#ffffff)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "40px",
            }}
        >
            {/* Top Navbar */}
            <div
                style={{
                    width: "100%",
                    background:
                        "linear-gradient(90deg,#312e81,#6d28d9)",
                    color: "white",
                    padding: "18px 50px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxSizing: "border-box",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: "700",
                    }}
                >
                    🧠 EchoBrain
                </h2>

                <button
                    onClick={() =>
                        router.push("/login")
                    }
                    style={{
                        background: "transparent",
                        color: "white",
                        border:
                            "1px solid rgba(255,255,255,0.5)",
                        padding:
                            "10px 18px",
                        borderRadius: "10px",
                        cursor: "pointer",
                    }}
                >
                    Login →
                </button>
            </div>

            {/* Success/Error Message */}
            {message && (
                <div
                    style={{
                        marginTop: "25px",
                        width: "60%",
                        padding: "16px",
                        borderRadius: "12px",
                        background:
                            messageType === "success"
                                ? "#dcfce7"
                                : "#fee2e2",
                        color:
                            messageType === "success"
                                ? "#166534"
                                : "#991b1b",
                        textAlign: "center",
                        fontWeight: "600",
                        boxShadow:
                            "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                >
                    {message}
                </div>
            )}

            {/* Register Card */}
            <div
                style={{
                    width: "450px",
                    marginTop: "40px",
                    background: "#fff",
                    borderRadius: "24px",
                    padding: "40px",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.08)",
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "50px",
                        }}
                    >
                        👤
                    </div>

                    <h1
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        Create Account
                    </h1>

                    <p
                        style={{
                            color: "#6b7280",
                        }}
                    >
                        Join EchoBrain and
                        analyze codebases with AI
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            border: "none",
                            borderRadius: "12px",
                            background:
                                "linear-gradient(90deg,#4f46e5,#7c3aed)",
                            color: "white",
                            fontWeight: "600",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>
                </form>

                <p
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        color: "#6b7280",
                    }}
                >
                    Already have an account?{" "}
                    <span
                        style={{
                            color: "#4f46e5",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                        onClick={() =>
                            router.push("/login")
                        }
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box",
};