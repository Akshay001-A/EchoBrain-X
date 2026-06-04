"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import { getProjects } from "../../src/services/projectService";
import { analyzeFlow } from "../../src/services/flowService";

export default function FlowPage() {
    const [projects, setProjects] =
        useState([]);

    const [selectedProject,
        setSelectedProject] =
        useState("");

    const [question,
        setQuestion] =
        useState(
            "Explain project architecture"
        );

    const [flow,
        setFlow] =
        useState("");

    const [loading,
        setLoading] =
        useState(false);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects =
        async () => {
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
                    setSelectedProject(
                        data.projects[0]._id
                    );
                }

            } catch (error) {
                console.error(error);
            }
        };

    const handleAnalyze =
        async () => {

            if (
                !selectedProject
            ) {
                alert(
                    "Please select project"
                );
                return;
            }

            try {

                setLoading(true);

                const data =
                    await analyzeFlow(
                        selectedProject,
                        question
                    );

                setFlow(
                    data.flow
                );

            } catch (error) {

                console.error(error);

                setFlow(
                    "Failed to analyze flow."
                );

            } finally {

                setLoading(false);
            }
        };

    return (
        <div
            style={{
                background:
                    "#f8fafc",
                minHeight:
                    "100vh",
            }}
        >
            <Topbar />

            <div
                style={{
                    display:
                        "flex",
                }}
            >
                <Sidebar />

                <main
                    style={{
                        marginLeft:
                            "260px",
                        width:
                            "100%",
                        padding:
                            "30px",
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
                            color:
                                "white",
                            padding:
                                "35px",
                            borderRadius:
                                "24px",
                            marginBottom:
                                "25px",
                        }}
                    >
                        <h1
                            style={{
                                margin:
                                    0,
                                fontSize:
                                    "38px",
                            }}
                        >
                            🔄 Flow Analysis
                        </h1>

                        <p
                            style={{
                                marginTop:
                                    "12px",
                                opacity:
                                    0.95,
                            }}
                        >
                            Understand how
                            requests move
                            through your
                            application.
                        </p>
                    </motion.div>

                    {/* Controls */}

                    <div
                        style={{
                            background:
                                "white",
                            borderRadius:
                                "24px",
                            padding:
                                "25px",
                            marginBottom:
                                "25px",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        <h2>
                            Analyze Flow
                        </h2>

                        <select
                            value={
                                selectedProject
                            }
                            onChange={(
                                e
                            ) =>
                                setSelectedProject(
                                    e.target
                                        .value
                                )
                            }
                            style={{
                                width:
                                    "100%",
                                padding:
                                    "14px",
                                marginTop:
                                    "10px",
                                borderRadius:
                                    "12px",
                                border:
                                    "1px solid #dbeafe",
                            }}
                        >
                            {projects.map(
                                (
                                    project
                                ) => (
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

                        <input
                            type="text"
                            value={
                                question
                            }
                            onChange={(
                                e
                            ) =>
                                setQuestion(
                                    e.target
                                        .value
                                )
                            }
                            placeholder="Ask flow question..."
                            style={{
                                width:
                                    "100%",
                                padding:
                                    "14px",
                                marginTop:
                                    "15px",
                                borderRadius:
                                    "12px",
                                border:
                                    "1px solid #dbeafe",
                            }}
                        />

                        <button
                            onClick={
                                handleAnalyze
                            }
                            style={{
                                marginTop:
                                    "15px",
                                background:
                                    "linear-gradient(135deg,#4f46e5,#7c3aed)",
                                color:
                                    "white",
                                border:
                                    "none",
                                padding:
                                    "14px 25px",
                                borderRadius:
                                    "12px",
                                fontWeight:
                                    "700",
                                cursor:
                                    "pointer",
                            }}
                        >
                            Analyze Flow
                        </button>
                    </div>

                    {/* Result */}

                    <div
                        style={{
                            background:
                                "white",
                            borderRadius:
                                "24px",
                            padding:
                                "30px",
                            minHeight:
                                "500px",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        {loading ? (
                            <h3>
                                🤖 Analyzing
                                Flow...
                            </h3>
                        ) : flow ? (
                            <pre
                                style={{
                                    whiteSpace:
                                        "pre-wrap",
                                    fontFamily:
                                        "inherit",
                                    lineHeight:
                                        "1.8",
                                }}
                            >
                                {flow}
                            </pre>
                        ) : (
                            <div
                                style={{
                                    textAlign:
                                        "center",
                                    color:
                                        "#64748b",
                                    padding:
                                        "100px",
                                }}
                            >
                                Select a
                                project and
                                click Analyze
                                Flow.
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}