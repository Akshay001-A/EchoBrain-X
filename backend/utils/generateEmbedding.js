const { pipeline } = require("@xenova/transformers");

let extractor = null;

async function generateEmbedding(text) {
    try {
        if (!extractor) {
            console.log("Loading embedding model...");

            extractor = await pipeline(
                "feature-extraction",
                "Xenova/all-MiniLM-L6-v2"
            );

            console.log("Embedding model loaded");
        }

        const output = await extractor(text, {
            pooling: "mean",
            normalize: true,
        });

        return Array.from(output.data);
    } catch (error) {
        console.error("Embedding Error:", error);
        return [];
    }
}

module.exports = generateEmbedding;