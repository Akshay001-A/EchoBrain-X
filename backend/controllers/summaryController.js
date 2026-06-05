const Snippet = require("../models/Snippet");
const askGemini = require("../utils/askGemini");

const generateProjectSummary = async (req, res) => {
    try {
        const { projectId } = req.body;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "projectId required",
            });
        }

        const snippets = await Snippet.find({
            projectId,
            userId: req.user.id,
        }).limit(30);

        if (!snippets.length) {
            return res.status(404).json({
                success: false,
                message: "No snippets found",
            });
        }

        const context = snippets
            .map(
                (snippet) =>
                    `FILE: ${snippet.filePath}\n\n${snippet.code}`
            )
            .join("\n\n====================\n\n");

        const prompt = `
You are EchoBrain X, an AI-powered software architect and project analyst.

Your mission is to analyze an entire codebase and generate a professional project summary that:

✅ Beginners can understand

✅ Developers can learn from

✅ Recruiters can quickly evaluate

✅ Interviewers can discuss

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT RULES

1. Use simple English.
2. Assume the user is a beginner.
3. Never use huge paragraphs.
4. Use professional emojis.
5. Use bullet points whenever possible.
6. Explain technical terms in simple language.
7. Mention ONLY information found in the code.
8. Never invent technologies, APIs, or features.
9. If information is missing, clearly mention it.
10. Add blank lines between sections.
11. Keep the summary visually attractive.
12. Use architecture diagrams whenever possible.
13. Explain the project from both:
    • Beginner perspective
    • Interview perspective
14. Mention only file names, not full paths.
15. End with Key Takeaways.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EMOJI GUIDE

🚀 Project Overview
🎯 Purpose
🛠️ Tech Stack
📂 Modules
🌐 Frontend
🛣️ Routes
🎮 Controllers
📦 Models
🍃 MongoDB
💾 Database
🔌 API
🏗️ Architecture
⚡ Features
🧠 Technical Notes
🎤 Interview Summary
💡 Key Takeaways

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CODE CONTEXT

${context}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OUTPUT FORMAT

# 🚀 Project Overview

Provide a short explanation of the project in 2-4 simple sentences.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 🎯 Purpose

Explain:

• What problem this project solves

• Who uses it

• Why it was built

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 🛠️ Tech Stack

List detected technologies.

Example:

🌐 Frontend

• React

• Next.js

• Tailwind CSS

🎮 Backend

• Node.js

• Express.js

💾 Database

• MongoDB

📦 Libraries

• JWT

• Axios

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 📂 Main Modules

For each major module:

📄 Module Name

🎯 Purpose

🛠️ Responsibilities

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 🔌 API Endpoints

List detected APIs.

Example:

📥 POST /api/auth/login

Purpose:
User Login

📥 POST /api/auth/register

Purpose:
User Registration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 📦 Database Models

For each model:

📄 User

Purpose:
Stores user information

📄 Product

Purpose:
Stores product information

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 🏗️ Architecture Overview

Show project flow.

Example:

👤 User

↓

🌐 Frontend

↓

🛣️ Routes

↓

🎮 Controllers

↓

📦 Models

↓

🍃 MongoDB

↓

📤 Response

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# ⚡ Key Features

List major project features.

Example:

✅ User Authentication

✅ Product Management

✅ Dashboard

✅ AI Chat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 🧠 Technical Notes

Explain important technical concepts in beginner-friendly language.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 🎤 Interview Summary

Explain the project in 5-10 lines as if answering an interviewer.

Cover:

• Purpose

• Architecture

• Technologies

• Features

• Challenges solved

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

# 💡 Key Takeaways

✅ Most important feature

✅ Main technology used

✅ Why the project is valuable

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORMATTING RULES

✅ Add blank lines between every section.

✅ Add blank lines between modules.

✅ Add blank lines between API endpoints.

✅ Keep explanations concise.

❌ Do NOT print large code snippets.

❌ Do NOT print full file paths.

❌ Do NOT invent information.

✅ Make output look like professional documentation.

`;


        const summary = await askGemini(prompt);

        res.status(200).json({
            success: true,
            summary,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    generateProjectSummary,
};