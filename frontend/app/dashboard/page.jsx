"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    getProjects,
    getProjectSnippets,
} from "../../src/services/projectService";

import {
    getTotalChats,
} from "../../src/services/chatService";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import StatCard from "../../components/StatCard";

export default function Dashboard() {
    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [totalSnippets, setTotalSnippets] =
        useState(0);

    const [totalChats, setTotalChats] =
        useState(0);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data =
                await getProjects();

            const projectList =
                data.projects || [];

            setProjects(
                projectList
            );


            const chatData =
                await getTotalChats();

            setTotalChats(
                chatData.totalChats || 0
            );

            let snippetCount = 0;

            for (const project of projectList) {
                try {
                    const snippetsData =
                        await getProjectSnippets(
                            project._id
                        );

                    snippetCount +=
                        snippetsData.totalSnippets;
                } catch (err) {
                    console.error(err);
                }
            }

            setTotalSnippets(
                snippetCount
            );

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
                            understand, summarize,
                            generate embeddings and chat
                            with any codebase instantly.
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
                            value={
                                loading
                                    ? "..."
                                    : projects.length
                            }
                            icon="📁"
                            subtitle="Uploaded repositories"
                            color="linear-gradient(90deg,#3b82f6,#2563eb)"
                        />

                        <StatCard
                            title="Snippets"
                            value={
                                loading
                                    ? "..."
                                    : totalSnippets
                            }
                            icon="📄"
                            subtitle="Indexed code snippets"
                            color="linear-gradient(90deg,#10b981,#059669)"
                        />

                        <StatCard
                            title="AI Chats"
                            value={loading ? "..." : totalChats}
                            icon="🤖"
                            subtitle="Questions asked"
                            color="linear-gradient(90deg,#8b5cf6,#7c3aed)"
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}