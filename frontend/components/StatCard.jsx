"use client";

export default function StatCard({
  title,
  value,
  icon,
  color,
  subtitle,
}) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "22px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.06)",
        transition: "0.3s",
        cursor: "pointer",
        border:
          "1px solid rgba(0,0,0,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Gradient Line */}
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
          marginBottom: "20px",
        }}
      >
        <h4
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          {title}
        </h4>

        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            background:
              "#f1f5f9",
            display: "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            fontSize: "24px",
          }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}
      <h1
        style={{
          margin: 0,
          fontSize: "38px",
          fontWeight: "700",
          color: "#0f172a",
        }}
      >
        {value}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          marginTop: "10px",
          color: "#94a3b8",
          fontSize: "14px",
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}