const Snippet = require("../models/Snippet");
const Chat = require("../models/Chat");

const generateEmbedding = require("../utils/generateEmbedding");
const cosineSimilarity = require("../utils/cosineSimilarity");
const askGemini = require("../utils/askGemini");

const chatWithProject = async (req, res) => {
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
            scoredResults.slice(0, 5);

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
You are EchoBrain, an AI that explains code to both technical and non-technical users.

IMPORTANT RULES:

1. Answer in simple English.
2. Assume the user may not know programming.
3. Never give huge paragraphs.
4. Use bullet points.
5. Start with a short summary.
6. Explain the flow step-by-step.
7. Explain WHY each file exists.
8. Mention file names clearly.
9. If a request flow exists, show it using arrows.
10. Use only the provided code context.
11. Do not invent information.

CODE CONTEXT:

${context}

QUESTION:

${question}

OUTPUT FORMAT:

## Summary
(2-3 simple sentences)

## How It Works
• Step 1
• Step 2
• Step 3

## Request Flow
File A
↓
File B
↓
File C

## Files Involved

📄 filename.ext
- What it does

📄 filename.ext
- What it does

## Technical Details
(Only if needed)
`;

        let answer = "";

        try {
            answer = await askGemini(prompt);
        } catch (error) {
            answer =
                "Gemini is currently busy. Please try again later.";
        }

        if (
            answer !==
            "Gemini is currently busy. Please try again later."
        ) {
            await Chat.create({
                userId: req.user.id,
                projectId,
                question,
                answer,
            });
        }

        const path = require("path");

        const sources = [
            ...new Set(
                topSnippets.map((item) =>
                    path.basename(item.snippet.filePath)
                )
            ),
        ];

        res.status(200).json({
            success: true,
            answer,
            sources,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


const getTotalChats = async (req, res) => {
    try {
        const totalChats = await Chat.countDocuments({
            userId: req.user.id,
        });

        res.status(200).json({
            success: true,
            totalChats,
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
    chatWithProject,
    getTotalChats,
};