"use client";

import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color,
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        background: "white",
        padding: "24px",
        borderRadius: "22px",
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.06)",
        border:
          "1px solid rgba(226,232,240,0.8)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Gradient Bar */}

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "5px",
          background:
            color ||
            "linear-gradient(90deg,#4f46e5,#7c3aed)",
        }}
      />

      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            {title}
          </p>
        </div>

        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg,#eef2ff,#f8fafc)",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            fontSize: "28px",
            boxShadow:
              "0 4px 15px rgba(99,102,241,0.08)",
          }}
        >
          {icon}
        </div>
      </div>

      {/* Number */}

      <h1
        style={{
          margin: 0,
          fontSize: "44px",
          fontWeight: "800",
          color: "#0f172a",
          lineHeight: 1,
        }}
      >
        {value}
      </h1>

      {/* Subtitle */}

      <p
        style={{
          marginTop: "12px",
          color: "#94a3b8",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {subtitle}
      </p>

      {/* Background Glow */}

      <div
        style={{
          position: "absolute",
          right: "-30px",
          bottom: "-30px",
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          background:
            "rgba(99,102,241,0.05)",
        }}
      />
    </motion.div>
  );
}