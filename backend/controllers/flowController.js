const Snippet = require("../models/Snippet");

const generateEmbedding = require("../utils/generateEmbedding");
const cosineSimilarity = require("../utils/cosineSimilarity");
const askGemini = require("../utils/askGemini");

const analyzeCodeFlow = async (req, res) => {
    try {
        const { projectId, question } = req.body;

        if (!projectId || !question) {
            return res.status(400).json({
                success: false,
                message:
                    "projectId and question required",
            });
        }

        const queryEmbedding =
            await generateEmbedding(
                question
            );

        const snippets =
            await Snippet.find({
                projectId,
                userId: req.user.id,
            });

        const scoredResults =
            snippets.map((snippet) => ({
                snippet,
                similarity:
                    cosineSimilarity(
                        queryEmbedding,
                        snippet.embedding
                    ),
            }));

        scoredResults.sort(
            (a, b) =>
                b.similarity -
                a.similarity
        );

        const topSnippets =
            scoredResults.slice(0, 10);

        const context =
            topSnippets
                .map(
                    (item) =>
                        `FILE: ${item.snippet.filePath}\n\n${item.snippet.code}`
                )
                .join(
                    "\n\n====================\n\n"
                );

        const prompt = `
You are EchoBrain.

Analyze the code and explain it like a senior software engineer teaching a beginner.

CODE:

${context}

QUESTION:

${question}

RULES:

1. Answer ONLY from code.
2. Explain in very simple English.
3. Assume the user is a beginner.
4. Mention why each file exists.
5. Mention what happens if that file is removed.
6. Show execution flow.
7. Mention backend and frontend interaction.
8. Never write long paragraphs.
9. Use bullet points.
10. Do not invent anything.

OUTPUT FORMAT:

🚀 What This Feature Does

Short explanation.

📍 Step-by-Step Execution

Step 1
File:
Purpose:
What happens:
Why needed:

Step 2
File:
Purpose:
What happens:
Why needed:

Step 3
File:
Purpose:
What happens:
Why needed:

🔄 Complete Request Journey

User Action
↓
Frontend
↓
API Route
↓
Controller
↓
Database
↓
Response
↓
UI Update

📂 Files Breakdown

📄 filename

Purpose:
Responsibilities:
Used By:
If Removed:

📄 filename

Purpose:
Responsibilities:
Used By:
If Removed:

🎯 Interview Explanation

Explain this feature in 5-10 lines as if answering an interviewer.
`;

        const flow =
            await askGemini(prompt);

        res.status(200).json({
            success: true,
            flow,
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
    analyzeCodeFlow,
};