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

            await registerUser(formData);

            alert("Registration Successful");

            router.push("/login");
        } catch (error) {
            alert("Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <form onSubmit={handleSubmit}>
                <h2>EchoBrain Register</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type="submit">
                    {loading
                        ? "Creating..."
                        : "Register"}
                </button>
            </form>
        </div>
    );
}