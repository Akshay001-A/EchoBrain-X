"use client";

import {
    useState,
    useEffect,
} from "react";
import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import {
    uploadProject,
    getProjects,
} from "../../src/services/projectService";

export default function UploadPage() {
    const [projectName, setProjectName] =
        useState("");

    const [file, setFile] =
        useState(null);

    const [uploading, setUploading] =
        useState(false);

    const [success, setSuccess] =
        useState(null);

    const [projects, setProjects] =
        useState([]);

    const [error, setError] =
        useState("");

    const handleFileChange = (e) => {
        const selected =
            e.target.files[0];

        if (selected) {
            setFile(selected);
            setSuccess("");
            setError("");
        }
    };

    const handleUpload = async () => {
        if (!projectName.trim()) {
            setError(
                "Please enter project name"
            );
            return;
        }

        if (!file) {
            setError(
                "Please select ZIP file"
            );
            return;
        }

        try {
            setUploading(true);
            setError("");
            setSuccess("");

            const data =
                await uploadProject(
                    file,
                    projectName
                );

            setSuccess({
                message:
                    data.message,
                totalFiles:
                    data.totalFiles,
                totalChunks:
                    data.totalChunks,
            });

            await loadProjects();
            setProjectName("");
            setFile(null);
        } catch (err) {
            setError(
                err?.response?.data
                    ?.message ||
                "Upload Failed"
            );
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data =
                await getProjects();

            setProjects(
                data.projects || []
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            style={{
                background: "#f8fafc",
                minHeight: "100vh",
            }}
        >
            <Topbar />

            <div
                style={{
                    display: "flex",
                }}
            >
                <Sidebar />

                <main
                    style={{
                        marginLeft: "260px",
                        width: "100%",
                        padding: "30px",
                    }}
                >
                    {/* Hero */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        style={{
                            background:
                                "linear-gradient(135deg,#4f46e5,#7c3aed)",
                            color: "white",
                            padding: "35px",
                            borderRadius: "24px",
                            marginBottom: "30px",
                            boxShadow:
                                "0 20px 40px rgba(124,58,237,0.25)",
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                                fontSize: "38px",
                            }}
                        >
                            📤 Upload Repository
                        </h1>

                        <p
                            style={{
                                marginTop: "12px",
                                opacity: 0.95,
                            }}
                        >
                            Upload your repository ZIP
                            and let EchoBrain analyze
                            your codebase using AI.
                        </p>
                    </motion.div>

                    {/* Messages */}

                    {
                        success && (
                            <div
                                style={{
                                    background:
                                        "#ecfdf5",
                                    border:
                                        "1px solid #86efac",
                                    color:
                                        "#166534",
                                    padding:
                                        "12px 16px",
                                    borderRadius:
                                        "12px",
                                    marginBottom:
                                        "20px",
                                    display:
                                        "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems:
                                        "center",
                                }}
                            >
                                <span>
                                    ✅ {
                                        success.message
                                    }
                                </span>

                                <span
                                    style={{
                                        fontWeight:
                                            "700",
                                    }}
                                >
                                    Files:
                                    {" "}
                                    {
                                        success.totalFiles
                                    }
                                    {" "}
                                    |
                                    Chunks:
                                    {" "}
                                    {
                                        success.totalChunks
                                    }
                                </span>
                            </div>
                        )
                    }
                    {/* Upload Card */}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: "white",
                            borderRadius: "20px",
                            padding: "25px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2
                            style={{
                                marginTop: 0,
                                color: "#1e293b",
                                marginBottom: "20px",
                            }}
                        >
                            📤 Upload New Repository
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr auto",
                                gap: "15px",
                                alignItems: "center",
                            }}
                        >
                            {/* Project Name */}

                            <input
                                type="text"
                                placeholder="Project Name"
                                value={projectName}
                                onChange={(e) =>
                                    setProjectName(e.target.value)
                                }
                                style={{
                                    padding: "14px",
                                    borderRadius: "12px",
                                    border: "1px solid #dbeafe",
                                    fontSize: "15px",
                                    outline: "none",
                                }}
                            />

                            {/* File */}

                            <input
                                type="file"
                                accept=".zip"
                                onChange={handleFileChange}
                                style={{
                                    padding: "12px",
                                }}
                            />

                            {/* Upload */}

                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                style={{
                                    background:
                                        "linear-gradient(135deg,#4f46e5,#7c3aed)",
                                    color: "white",
                                    border: "none",
                                    padding: "14px 22px",
                                    borderRadius: "12px",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                }}
                            >
                                {uploading
                                    ? "Analyzing..."
                                    : "Upload"}
                            </button>
                        </div>

                        {file && (
                            <div
                                style={{
                                    marginTop: "15px",
                                    background: "#eef2ff",
                                    padding: "12px 15px",
                                    borderRadius: "12px",
                                    color: "#4338ca",
                                    fontWeight: "600",
                                }}
                            >
                                📁 {file.name}
                            </div>
                        )}
                    </motion.div>

                    {/* Recent Uploads */}

                    <div
                        style={{
                            marginTop: "30px",
                            background:
                                "white",
                            borderRadius:
                                "24px",
                            padding: "30px",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2>
                            📂 Recent Uploads
                        </h2>

                        {
                            projects.length ===
                                0 ? (
                                <div
                                    style={{
                                        marginTop:
                                            "20px",
                                        color:
                                            "#64748b",
                                        textAlign:
                                            "center",
                                        padding:
                                            "30px",
                                    }}
                                >
                                    No uploads yet.
                                </div>
                            ) : (
                                projects.map(
                                    (
                                        project
                                    ) => (
                                        <div
                                            key={
                                                project._id
                                            }
                                            style={{
                                                padding:
                                                    "15px",
                                                border:
                                                    "1px solid #e2e8f0",
                                                borderRadius:
                                                    "12px",
                                                marginTop:
                                                    "12px",
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "space-between",
                                                alignItems:
                                                    "center",
                                            }}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                        fontWeight:
                                                            "700",
                                                    }}
                                                >
                                                    📁{" "}
                                                    {
                                                        project.projectName
                                                    }
                                                </div>

                                                <div
                                                    style={{
                                                        color:
                                                            "#64748b",
                                                        fontSize:
                                                            "14px",
                                                    }}
                                                >
                                                    {
                                                        project.originalFileName
                                                    }
                                                </div>
                                            </div>

                                            <div
                                                style={{
                                                    color:
                                                        "#94a3b8",
                                                    fontSize:
                                                        "13px",
                                                }}
                                            >
                                                {new Date(
                                                    project.createdAt
                                                ).toLocaleDateString()}
                                            </div>
                                        </div>
                                    )
                                )
                            )
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}