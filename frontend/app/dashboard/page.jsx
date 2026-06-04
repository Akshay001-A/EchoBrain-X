"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import StatCard from "../../components/StatCard";

export default function Dashboard() {
    const router = useRouter();

    return (
        <div
            style={{
                background: "#f8fafc",
                minHeight: "100vh",
            }}
        >
            {/* Topbar */}
            <Topbar />

            <div
                style={{
                    display: "flex",
                }}
            >
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main
                    style={{
                        marginLeft: "260px",
                        width: "100%",
                        padding: "30px",
                    }}
                >
                    {/* Hero Section */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        style={{
                            background:
                                "linear-gradient(135deg,#4f46e5,#7c3aed)",
                            color: "white",
                            padding: "40px",
                            borderRadius: "24px",
                            boxShadow:
                                "0 20px 40px rgba(124,58,237,0.25)",
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                                fontSize: "42px",
                                fontWeight: "700",
                            }}
                        >
                            Welcome to EchoBrain X 🚀
                        </h1>

                        <p
                            style={{
                                marginTop: "15px",
                                fontSize: "18px",
                                opacity: 0.95,
                                maxWidth: "700px",
                            }}
                        >
                            AI-powered platform to search,
                            understand, summarize, generate
                            embeddings and chat with any
                            codebase instantly.
                        </p>
                    </motion.div>

                    {/* Statistics */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(3,1fr)",
                            gap: "25px",
                            marginTop: "30px",
                        }}
                    >
                        <StatCard
                            title="Projects"
                            value="0"
                            icon="📁"
                            subtitle="Uploaded repositories"
                            color="linear-gradient(90deg,#3b82f6,#2563eb)"
                        />

                        <StatCard
                            title="Snippets"
                            value="0"
                            icon="📄"
                            subtitle="Indexed code snippets"
                            color="linear-gradient(90deg,#10b981,#059669)"
                        />

                        <StatCard
                            title="AI Chats"
                            value="0"
                            icon="🤖"
                            subtitle="Questions asked"
                            color="linear-gradient(90deg,#8b5cf6,#7c3aed)"
                        />
                    </div>

                    {/* Upload Section */}

                    <motion.div
                        whileHover={{
                            scale: 1.01,
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        style={{
                            marginTop: "30px",
                            background: "white",
                            padding: "35px",
                            borderRadius: "24px",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent:
                                    "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <h2
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    🚀 Upload New Project
                                </h2>

                                <p
                                    style={{
                                        color: "#64748b",
                                        marginTop: "10px",
                                    }}
                                >
                                    Upload a ZIP repository and
                                    let EchoBrain analyze your
                                    codebase automatically.
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    router.push("/upload")
                                }
                                style={{
                                    background:
                                        "linear-gradient(135deg,#4f46e5,#7c3aed)",
                                    color: "white",
                                    border: "none",
                                    padding:
                                        "14px 28px",
                                    borderRadius:
                                        "14px",
                                    cursor:
                                        "pointer",
                                    fontWeight:
                                        "700",
                                    fontSize:
                                        "15px",
                                    boxShadow:
                                        "0 10px 25px rgba(124,58,237,0.25)",
                                }}
                            >
                                Upload Project
                            </button>
                        </div>
                    </motion.div>

                    {/* Recent Projects */}

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        style={{
                            marginTop: "30px",
                            background: "white",
                            padding: "35px",
                            borderRadius: "24px",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2
                            style={{
                                marginTop: 0,
                            }}
                        >
                            📌 Recent Projects
                        </h2>

                        <div
                            style={{
                                textAlign: "center",
                                padding: "50px",
                                color: "#64748b",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "60px",
                                }}
                            >
                                📂
                            </div>

                            <h3>
                                No Projects Uploaded Yet
                            </h3>

                            <p>
                                Upload your first repository
                                to start AI-powered code
                                analysis.
                            </p>

                            <button
                                onClick={() =>
                                    router.push("/upload")
                                }
                                style={{
                                    marginTop: "10px",
                                    background:
                                        "#4f46e5",
                                    color: "white",
                                    border: "none",
                                    padding:
                                        "12px 24px",
                                    borderRadius:
                                        "12px",
                                    cursor:
                                        "pointer",
                                    fontWeight:
                                        "600",
                                }}
                            >
                                Upload Now
                            </button>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}