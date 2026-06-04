const Snippet = require("../models/Snippet");

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
You are an expert software engineer.

Answer ONLY using the provided code context.

CODE CONTEXT:

${context}

QUESTION:

${question}
`;

        const answer =
            await askGemini(prompt);

        res.status(200).json({
            success: true,
            answer,
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
};