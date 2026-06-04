"use client";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

import { useEffect } from "react";

import {
    getProjects,
} from "../../src/services/projectService";

import {
    askQuestion,
} from "../../src/services/chatService";

import { motion } from "framer-motion";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function ChatPage() {
    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState([
            {
                role: "assistant",
                content:
                    "👋 Hi! Ask anything about your uploaded project.",
            },
        ]);

    const [loading, setLoading] =
        useState(false);

    const [projects, setProjects] =
        useState([]);

    const [selectedProject, setSelectedProject] =
        useState("");

    const handleSend = async () => {
        if (!question.trim()) return;

        if (!selectedProject) {
            alert(
                "Please select project"
            );
            return;
        }

        const userMessage = {
            role: "user",
            content: question,
        };

        setMessages((prev) => [
            ...prev,
            userMessage,
        ]);

        const currentQuestion =
            question;

        setQuestion("");

        try {
            setLoading(true);

            const data =
                await askQuestion(
                    selectedProject,
                    currentQuestion
                );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        data.answer,
                },
            ]);

        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "⚠️ Gemini is currently busy. Please try again in a few seconds.",
                },
            ]);
        } finally {
            setLoading(false);
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
                                "25px",
                        }}
                    >
                        <h1
                            style={{
                                margin: 0,
                                fontSize: "36px",
                            }}
                        >
                            🤖 AI Code Assistant
                        </h1>

                        <p
                            style={{
                                marginTop:
                                    "10px",
                                opacity:
                                    0.95,
                            }}
                        >
                            Chat with your
                            uploaded repositories
                            and get instant
                            code explanations.
                        </p>
                    </motion.div>


                    <div
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        <select
                            value={selectedProject}
                            onChange={(e) =>
                                setSelectedProject(
                                    e.target.value
                                )
                            }
                            style={{
                                width: "300px",
                                padding: "12px",
                                borderRadius: "12px",
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

                    {/* Chat Container */}

                    <div
                        style={{
                            background: "white",
                            borderRadius: "24px",
                            display: "flex",
                            flexDirection: "column",
                            height: "60vh",
                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.05)",
                        }}
                    >
                        {/* Messages */}

                        <div
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                padding: "25px",
                            }}
                        >
                            {messages.map(
                                (
                                    message,
                                    index
                                ) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                message.role ===
                                                    "user"
                                                    ? "flex-end"
                                                    : "flex-start",
                                            marginBottom:
                                                "15px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: "75%",
                                                padding: "16px 20px",
                                                borderRadius: "18px",
                                                background:
                                                    message.role === "user"
                                                        ? "#4f46e5"
                                                        : "#f8fafc",
                                                color:
                                                    message.role === "user"
                                                        ? "white"
                                                        : "#0f172a",
                                                lineHeight: "1.7",
                                                overflowWrap: "break-word",
                                            }}
                                        >
                                            {message.role === "assistant" ? (
                                                <ReactMarkdown>
                                                    {message.content}
                                                </ReactMarkdown>
                                            ) : (
                                                message.content
                                            )}
                                        </div>
                                    </div>
                                )
                            )}

                            {loading && (
                                <div
                                    style={{
                                        color:
                                            "#64748b",
                                    }}
                                >
                                    🤖 Thinking...
                                </div>
                            )}
                        </div>

                        {/* Input */}

                        <div
                            style={{
                                padding: "20px",
                                borderTop:
                                    "1px solid #e2e8f0",
                                display: "flex",
                                gap: "15px",
                                background: "white",
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Ask about your project..."
                                value={question}
                                onChange={(e) =>
                                    setQuestion(
                                        e.target.value
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (
                                        e.key ===
                                        "Enter"
                                    ) {
                                        handleSend();
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    padding: "15px",
                                    borderRadius:
                                        "12px",
                                    border:
                                        "1px solid #dbeafe",
                                    outline: "none",
                                    fontSize:
                                        "15px",
                                }}
                            />

                            <button
                                onClick={
                                    handleSend
                                }
                                style={{
                                    background:
                                        "linear-gradient(135deg,#4f46e5,#7c3aed)",
                                    color:
                                        "white",
                                    border: "none",
                                    padding:
                                        "15px 25px",
                                    borderRadius:
                                        "12px",
                                    cursor:
                                        "pointer",
                                    fontWeight:
                                        "700",
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </div>


                </main>
            </div>
        </div>
    );
}