"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import { getProjects }
    from "../../src/services/projectService";

import { getProjectSummary }
    from "../../src/services/summaryService";

export default function SummaryPage() {

    const [projects, setProjects] =
        useState([]);

    const [selectedProject,
        setSelectedProject] =
        useState("");

    const [summary, setSummary] =
        useState("");

     const summaryRef = useRef(null);   

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
                    data.projects.length
                ) {
                    setSelectedProject(
                        data.projects[0]._id
                    );
                }

            } catch (error) {
                console.error(error);
            }
        };

    const generateSummary =
        async () => {

            if (!selectedProject)
                return;

            try {

                setLoading(true);

                const data =
                    await getProjectSummary(
                        selectedProject
                    );

                setSummary(
                    data.summary
                );

            } catch (error) {

                console.error(error);

                setSummary(
                    "Failed to generate summary."
                );

            } finally {
                setLoading(false);
            }
        };


          const downloadPDF = async () => {

    if (!summaryRef.current) return;

    const canvas =
        await html2canvas(
            summaryRef.current,
            {
                scale: 5,
            }
        );

    const imgData =
        canvas.toDataURL(
            "image/png"
        );

    const pdf =
        new jsPDF(
            "p",
            "mm",
            "a4"
        );

    const pdfWidth =
        pdf.internal.pageSize.getWidth();

    const pdfHeight =
        (canvas.height *
            pdfWidth) /
        canvas.width;

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
    );

    pdf.save(
        "EchoBrainX-Summary.pdf"
    );
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
                        marginLeft:
                            "260px",
                        width: "100%",
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
                                margin: 0,
                                fontSize:
                                    "38px",
                            }}
                        >
                            📄 Project Summary
                        </h1>

                        <p
                            style={{
                                marginTop:
                                    "12px",
                            }}
                        >
                            Generate an AI-powered
                            summary of your
                            project architecture.
                        </p>
                    </motion.div>

                    {/* Controls */}

                    <div
                        style={{
                            display:
                                "flex",
                            gap: "15px",
                            marginBottom:
                                "20px",
                        }}
                    >
                        <select
                            value={
                                selectedProject
                            }
                            onChange={(e) =>
                                setSelectedProject(
                                    e.target
                                        .value
                                )
                            }
                            style={{
                                flex: 1,
                                padding:
                                    "14px",
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

                       <div
    style={{
        display: "flex",
        gap: "10px",
    }}
>
    <button
        onClick={generateSummary}
        style={{
            background:
                "linear-gradient(135deg,#4f46e5,#7c3aed)",
            color: "white",
            border: "none",
            padding: "14px 24px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "700",
        }}
    >
        Generate
    </button>

    {summary && (
        <button
            onClick={downloadPDF}
            style={{
                background:
                    "#10b981",
                color: "white",
                border: "none",
                padding:
                    "14px 24px",
                borderRadius:
                    "12px",
                cursor:
                    "pointer",
                fontWeight:
                    "700",
            }}
        >
            📄 Download PDF
        </button>
    )}
</div>
                    </div>
                     


                      

                    {/* Summary */}

                    <div
    ref={summaryRef}
    style={{
        background:
            "white",
        borderRadius:
            "24px",
        padding:
            "30px",
        minHeight:
            "600px",
        boxShadow:
            "0 10px 25px rgba(0,0,0,0.05)",
    }}
>
                        {loading ? (
                            <h3>
                                🤖 Generating
                                Summary...
                            </h3>
                        ) : summary ? (
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
                                {summary}
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
                                Select a project
                                and click
                                Generate.
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}