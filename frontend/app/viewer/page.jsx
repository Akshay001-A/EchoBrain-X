"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import {
    getProjects,
} from "../../src/services/projectService";

import {
    getProjectFiles,
    getFileCode,
} from "../../src/services/codeViewerService";

export default function ViewerPage() {
    const [projects, setProjects] =
        useState([]);

    const [selectedProject, setSelectedProject] =
        useState("");

    const [files, setFiles] =
        useState([]);

    const [selectedFile, setSelectedFile] =
        useState("");
    const [searchTerm, setSearchTerm] =
        useState("");

    const [code, setCode] =
        useState("");

    const [loading, setLoading] =
        useState(false);

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

            if (
                data.projects &&
                data.projects.length > 0
            ) {
                handleProjectChange(
                    data.projects[0]._id
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleProjectChange =
        async (projectId) => {
            try {
                setSelectedProject(projectId);

                const data =
                    await getProjectFiles(
                        projectId
                    );

                setFiles(
                    data.files || []
                );

                setSelectedFile("");
                setCode("");
            } catch (error) {
                console.error(error);
            }
        };

    const handleFileClick =
        async (filePath) => {
            try {
                setLoading(true);

                setSelectedFile(
                    filePath
                );

                const data =
                    await getFileCode(
                        selectedProject,
                        filePath
                    );

                setCode(
                    data.code || ""
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    const filteredFiles =
        files.filter((file) =>
            file
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )
        );

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
                            📄 Source Code Viewer
                        </h1>

                        <p
                            style={{
                                marginTop: "12px",
                                opacity: 0.95,
                            }}
                        >
                            Browse and inspect
                            uploaded source code
                            files.
                        </p>
                    </motion.div>

                    {/* Project Selector */}

                    <div
                        style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "20px",
                            marginBottom: "25px",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h3>
                            Select Project
                        </h3>

                        <select
                            value={
                                selectedProject
                            }
                            onChange={(e) =>
                                handleProjectChange(
                                    e.target.value
                                )
                            }
                            style={{
                                width: "100%",
                                padding: "14px",
                                borderRadius:
                                    "12px",
                                border:
                                    "1px solid #dbeafe",
                            }}
                        >
                            {projects.map(
                                (project) => (
                                    <option
                                        key={
                                            project._id
                                        }
                                        value={
                                            project._id
                                        }
                                    >
                                        {
                                            project.projectName
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {/* Viewer Layout */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "350px 1fr",
                            gap: "20px",
                        }}
                    >
                        {/* Files */}

                        <div
                            style={{
                                background:
                                    "white",
                                borderRadius:
                                    "20px",
                                padding: "20px",
                                height:
                                    "700px",
                                overflowY:
                                    "auto",
                                boxShadow:
                                    "0 10px 25px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3>
                                📂 Files ({filteredFiles.length})
                            </h3>
                            <input
                                type="text"
                                placeholder="🔍 Search files..."
                                value={searchTerm}
                                onChange={(e) =>
                                    setSearchTerm(
                                        e.target.value
                                    )
                                }
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "10px",
                                    border:
                                        "1px solid #dbeafe",
                                    marginBottom: "15px",
                                    outline: "none",
                                }}
                            />

                            {files.length ===
                                0 ? (
                                <p>
                                    No files found
                                </p>
                            ) : (
                                filteredFiles.map(
                                    (
                                        file,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                index
                                            }
                                            onClick={() =>
                                                handleFileClick(
                                                    file
                                                )
                                            }
                                            style={{
                                                padding:
                                                    "12px",
                                                marginBottom:
                                                    "8px",
                                                borderRadius:
                                                    "10px",
                                                cursor:
                                                    "pointer",
                                                background:
                                                    selectedFile ===
                                                        file
                                                        ? "#eef2ff"
                                                        : "#f8fafc",
                                                border:
                                                    selectedFile ===
                                                        file
                                                        ? "1px solid #4f46e5"
                                                        : "1px solid #e2e8f0",
                                                wordBreak:
                                                    "break-all",
                                            }}
                                        >
                                            📄{" "}
                                            {file
                                                .split(
                                                    "\\"
                                                )
                                                .pop()}
                                        </div>
                                    )
                                )
                            )}
                        </div>

                        {/* Code */}

                        <div
                            style={{
                                background:
                                    "white",
                                borderRadius:
                                    "20px",
                                padding: "20px",
                                height:
                                    "700px",
                                overflow: "hidden",
                                boxShadow:
                                    "0 10px 25px rgba(0,0,0,0.05)",
                            }}
                        >
                            <h3>
                                💻 Source Code
                            </h3>

                            <p
                                style={{
                                    color: "#64748b",
                                    marginBottom: "15px",
                                    fontSize: "14px",
                                }}
                            >
                                {selectedFile
                                    ? selectedFile
                                        .split("\\")
                                        .pop()
                                    : "No file selected"}
                            </p>

                            {loading ? (
                                <p>
                                    Loading...
                                </p>
                            ) : (
                                <pre
                                    style={{
                                        background:
                                            "#0f172a",
                                        color:
                                            "#e2e8f0",
                                        padding:
                                            "20px",
                                        borderRadius:
                                            "12px",
                                        height:
                                            "620px",
                                        overflow:
                                            "auto",
                                        fontSize:
                                            "14px",
                                        lineHeight:
                                            "1.5",
                                        whiteSpace:
                                            "pre-wrap",
                                    }}
                                >
                                    <code>
                                        {code ||
                                            "Select a file from the left panel."}
                                    </code>
                                </pre>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}