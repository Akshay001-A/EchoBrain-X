"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser } from "../../src/services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response =
        await loginUser(formData);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.user
        )
      );

      setMessageType(
        "success"
      );

      setMessage(
        response.message ||
          "Login Successful"
      );

      setTimeout(() => {
        router.push(
          "/dashboard"
        );
      }, 1500);
    } catch (error) {
      setMessageType("error");

      setMessage(
        error?.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#eef2ff,#f8fafc,#f5f3ff)",
      }}
    >
      {/* Navbar */}

      <motion.nav
        initial={{
          y: -60,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        style={{
          height: "80px",
          background:
            "linear-gradient(90deg,#312e81,#6d28d9)",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          padding:
            "0 50px",
          color: "white",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontWeight: "700",
          }}
        >
          🧠 EchoBrain X
        </h2>

        <Link
          href="/register"
          style={{
            color: "white",
            textDecoration:
              "none",
            border:
              "1px solid rgba(255,255,255,0.4)",
            padding:
              "12px 24px",
            borderRadius:
              "14px",
          }}
        >
          Register →
        </Link>
      </motion.nav>

      {/* Alert */}

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
            style={{
              width: "80%",
              margin:
                "25px auto",
              padding:
                "18px",
              borderRadius:
                "16px",
              textAlign:
                "center",
              fontWeight: "600",
              background:
                messageType ===
                "success"
                  ? "#dcfce7"
                  : "#fee2e2",
              color:
                messageType ===
                "success"
                  ? "#166534"
                  : "#b91c1c",
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Card */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          minHeight:
            "calc(100vh - 120px)",
          padding: "30px",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          style={{
            width: "520px",
            background:
              "rgba(255,255,255,0.85)",
            backdropFilter:
              "blur(20px)",
            padding:
              "45px",
            borderRadius:
              "30px",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              textAlign:
                "center",
              marginBottom:
                "30px",
            }}
          >
            <motion.div
              animate={{
                y: [
                  0,
                  -8,
                  0,
                ],
              }}
              transition={{
                repeat:
                  Infinity,
                duration: 3,
              }}
              style={{
                fontSize:
                  "60px",
              }}
            >
              🧠
            </motion.div>

            <h1
              style={{
                margin:
                  "10px 0",
                fontSize:
                  "32px",
                color:
                  "#111827",
              }}
            >
              Welcome Back
            </h1>

            <p
              style={{
                color:
                  "#6b7280",
              }}
            >
              Login to your
              EchoBrain X account
            </p>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              style={{
                width:
                  "100%",
                padding:
                  "16px",
                marginBottom:
                  "18px",
                borderRadius:
                  "14px",
                border:
                  "1px solid #d1d5db",
                fontSize:
                  "16px",
              }}
            />

            <div
              style={{
                position:
                  "relative",
              }}
            >
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
                style={{
                  width:
                    "100%",
                  padding:
                    "16px",
                  borderRadius:
                    "14px",
                  border:
                    "1px solid #d1d5db",
                  fontSize:
                    "16px",
                }}
              />

              <span
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={{
                  position:
                    "absolute",
                  right:
                    "16px",
                  top: "18px",
                  cursor:
                    "pointer",
                }}
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </span>
            </div>

            <motion.button
              whileHover={{
                scale:
                  1.03,
              }}
              whileTap={{
                scale:
                  0.97,
              }}
              type="submit"
              disabled={
                loading
              }
              style={{
                width:
                  "100%",
                marginTop:
                  "25px",
                padding:
                  "16px",
                border: "none",
                borderRadius:
                  "14px",
                background:
                  "linear-gradient(90deg,#4f46e5,#7c3aed)",
                color:
                  "white",
                fontSize:
                  "18px",
                fontWeight:
                  "600",
                cursor:
                  "pointer",
              }}
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </motion.button>
          </form>

          <p
            style={{
              textAlign:
                "center",
              marginTop:
                "25px",
              color:
                "#6b7280",
            }}
          >
            Don't have an
            account?{" "}
            <Link
              href="/register"
              style={{
                color:
                  "#4f46e5",
                fontWeight:
                  "600",
              }}
            >
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}