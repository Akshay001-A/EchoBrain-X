"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import {
    getProjects,
    deleteProject,
} from "../../src/services/projectService";

export default function ProjectsPage() {
    const [projects, setProjects] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

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
        } finally {
            setLoading(false);
        }
    };

    const handleDelete =
        async (projectId) => {
            const confirmDelete =
                window.confirm(
                    "Delete this project?"
                );

            if (!confirmDelete) return;

            try {
                await deleteProject(
                    projectId
                );

                setProjects(
                    projects.filter(
                        (project) =>
                            project._id !==
                            projectId
                    )
                );
            } catch (error) {
                console.log(error);
                alert(
                    "Delete Failed"
                );
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
                            marginBottom:
                                "30px",
                            boxShadow:
                                "0 20px 40px rgba(124,58,237,0.25)",
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                                fontSize:
                                    "38px",
                            }}
                        >
                            📂 Projects
                        </h1>

                        <p
                            style={{
                                marginTop:
                                    "12px",
                                opacity:
                                    0.95,
                            }}
                        >
                            Manage all
                            repositories
                            uploaded to
                            EchoBrain X.
                        </p>
                    </motion.div>

                    {/* Stats */}

                    <div
                        style={{
                            display:
                                "grid",
                            gridTemplateColumns:
                                "repeat(3,1fr)",
                            gap: "20px",
                            marginBottom:
                                "30px",
                        }}
                    >
                        <div
                            style={{
                                background:
                                    "white",
                                padding:
                                    "25px",
                                borderRadius:
                                    "20px",
                                boxShadow:
                                    "0 10px 25px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3>
                                📁 Total
                                Projects
                            </h3>

                            <h1>
                                {
                                    projects.length
                                }
                            </h1>
                        </div>

                        <div
                            style={{
                                background:
                                    "white",
                                padding:
                                    "25px",
                                borderRadius:
                                    "20px",
                                boxShadow:
                                    "0 10px 25px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3>
                                🤖 AI
                                Ready
                            </h3>

                            <h1>
                                {
                                    projects.length
                                }
                            </h1>
                        </div>

                        <div
                            style={{
                                background:
                                    "white",
                                padding:
                                    "25px",
                                borderRadius:
                                    "20px",
                                boxShadow:
                                    "0 10px 25px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3>
                                📊 Indexed
                            </h3>

                            <h1>
                                {
                                    projects.length
                                }
                            </h1>
                        </div>
                    </div>

                    {/* Projects */}

                    <div
                        style={{
                            background:
                                "white",
                            borderRadius:
                                "24px",
                            padding:
                                "30px",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2>
                            Recent
                            Projects
                        </h2>

                        {loading ? (
                            <div
                                style={{
                                    padding:
                                        "30px",
                                }}
                            >
                                Loading...
                            </div>
                        ) : projects.length ===
                            0 ? (
                            <div
                                style={{
                                    textAlign:
                                        "center",
                                    padding:
                                        "50px",
                                    color:
                                        "#64748b",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize:
                                            "70px",
                                    }}
                                >
                                    📂
                                </div>

                                <h3>
                                    No
                                    Projects
                                    Found
                                </h3>

                                <p>
                                    Upload
                                    your
                                    first
                                    repository
                                    from
                                    Upload
                                    Page.
                                </p>
                            </div>
                        ) : (
                            projects.map(
                                (
                                    project
                                ) => (
                                    <motion.div
                                        key={
                                            project._id
                                        }
                                        whileHover={{
                                            scale:
                                                1.01,
                                        }}
                                        style={{
                                            padding:
                                                "20px",
                                            border:
                                                "1px solid #e2e8f0",
                                            borderRadius:
                                                "16px",
                                            marginBottom:
                                                "15px",
                                            display:
                                                "flex",
                                            justifyContent:
                                                "space-between",
                                            alignItems:
                                                "center",
                                        }}
                                    >
                                        <div>
                                            <h3>
                                                📁{" "}
                                                {
                                                    project.projectName
                                                }
                                            </h3>

                                            <p
                                                style={{
                                                    color:
                                                        "#64748b",
                                                }}
                                            >
                                                {
                                                    project.originalFileName
                                                }
                                            </p>

                                            <p
                                                style={{
                                                    color:
                                                        "#94a3b8",
                                                    fontSize:
                                                        "14px",
                                                }}
                                            >
                                                Uploaded:
                                                {" "}
                                                {new Date(
                                                    project.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        project._id
                                                    )
                                                }
                                                style={{
                                                    background: "#ef4444",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "12px 20px",
                                                    borderRadius: "12px",
                                                    cursor: "pointer",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                🗑 Delete
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            )
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}