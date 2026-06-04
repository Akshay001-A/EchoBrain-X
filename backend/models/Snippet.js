const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        filePath: {
            type: String,
            required: true,
        },

        language: {
            type: String,
            default: "unknown",
        },

        chunkIndex: {
            type: Number,
            required: true,
        },

        code: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Snippet", snippetSchema);