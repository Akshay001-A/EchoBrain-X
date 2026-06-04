"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "🏠",
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: "📁",
      path: "/projects",
    },
    {
      name: "Upload Code",
      icon: "📤",
      path: "/upload",
    },
    {
      name: "AI Chat",
      icon: "🤖",
      path: "/chat",
    },
    {
      name: "Summary",
      icon: "📄",
      path: "/summary",
    },
    {
      name: "Flow Analysis",
      icon: "🔄",
      path: "/flow",
    },
    {
      name: "Settings",
      icon: "⚙️",
      path: "/settings",
    },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "calc(100vh - 90px)",
        background: "#EDF4FF",
        borderRight: "1px solid #dbeafe",
        position: "fixed",
        left: 0,
        top: "90px",
        padding: "25px 18px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px 18px",
              borderRadius: "18px",
              fontSize: "18px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              background:
                pathname === item.path
                  ? "linear-gradient(135deg,#4f46e5,#7c3aed)"
                  : "transparent",
              color:
                pathname === item.path
                  ? "#fff"
                  : "#1e293b",
              boxShadow:
                pathname === item.path
                  ? "0 10px 25px rgba(79,70,229,0.25)"
                  : "none",
            }}
          >
            <span
              style={{
                fontSize: "22px",
              }}
            >
              {item.icon}
            </span>

            {item.name}
          </Link>
        ))}
      </div>


    </div>
  );

}
