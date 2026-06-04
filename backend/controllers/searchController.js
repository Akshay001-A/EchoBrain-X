const Snippet = require("../models/Snippet");

const searchSnippets = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query required",
            });
        }

        const snippets = await Snippet.find({
            userId: req.user.id,
            code: {
                $regex: query,
                $options: "i",
            },
        });

        const uniqueFiles = [
            ...new Set(
                snippets.map((snippet) => snippet.filePath)
            ),
        ];

        res.status(200).json({
            success: true,
            totalFiles: uniqueFiles.length,
            files: uniqueFiles,
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