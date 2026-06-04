const Snippet = require("../models/Snippet");
const generateEmbedding = require("../utils/generateEmbedding");
const cosineSimilarity = require("../utils/cosineSimilarity");

const searchSnippets = async (req, res) => {
    try {
        const { projectId, query } = req.body;

        if (!projectId || !query) {
            return res.status(400).json({
                success: false,
                message: "projectId and query required",
            });
        }

        console.log("Generating query embedding...");

        const queryEmbedding =
            await generateEmbedding(query);

        console.log("Query embedding generated");

        const snippets = await Snippet.find({
            projectId,
            userId: req.user.id,
        });

        console.log(
            `Found ${snippets.length} snippets`
        );

        const scoredResults = snippets.map(
            (snippet) => ({
                snippet,
                similarity: cosineSimilarity(
                    queryEmbedding,
                    snippet.embedding
                ),
            })
        );

        scoredResults.sort(
            (a, b) =>
                b.similarity - a.similarity
        );

        const topResults = scoredResults
            .slice(0, 5)
            .map((item) => {
                const snippet = item.snippet;

                let cleanPath = snippet.filePath;

                if (
                    cleanPath.includes(
                        "test-mern-project"
                    )
                ) {
                    cleanPath =
                        cleanPath
                            .split(
                                "test-mern-project"
                            )[1]
                            .replace(
                                /\\/g,
                                "/"
                            )
                            .replace(
                                /^\/+/,
                                ""
                            );
                }

                return {
                    id: snippet._id,
                    filePath: cleanPath,
                    language:
                        snippet.language,
                    chunkIndex:
                        snippet.chunkIndex,
                    code: snippet.code,
                    similarity: Number(
                        item.similarity.toFixed(
                            4
                        )
                    ),
                };
            });

        res.status(200).json({
            success: true,
            totalResults:
                topResults.length,
            results: topResults,
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
    searchSnippets,
};