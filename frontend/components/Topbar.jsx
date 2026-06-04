"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
        localStorage.getItem("user") || "{}"
      )
      : {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div
      style={{
        height: "90px",
        width: "100%",
        background:
          "linear-gradient(90deg,#312e81,#7c3aed)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        borderRadius: "0 0 22px 22px",
        boxShadow:
          "0 12px 35px rgba(124,58,237,0.25)",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            fontSize: "32px",
          }}
        >
          🧠
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "700",
              letterSpacing: "0.5px",
            }}
          >
            EchoBrain X
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              opacity: 0.85,
            }}
          >
            AI Powered Code Understanding
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              opacity: 0.8,
            }}
          >
            Welcome
          </div>

          <div
            style={{
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            {user?.name || "User"}
          </div>
        </div>

        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background:
              "rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            border:
              "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(10px)",
          }}
        >
          👤
        </div>

        <button
          onClick={handleLogout}
          style={{
            background:
              "rgba(255,255,255,0.12)",
            color: "white",
            border:
              "1px solid rgba(255,255,255,0.25)",
            padding: "14px 28px",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "16px",
            transition: "0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.background =
              "rgba(255,255,255,0.2)";
          }}
          onMouseOut={(e) => {
            e.target.style.background =
              "rgba(255,255,255,0.12)";
          }}
        >
          Logout →
        </button>
      </div>
    </div>
  );

}
