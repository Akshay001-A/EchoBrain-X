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
You are EchoBrain.

Analyze the project and generate a project summary.

CODE:

${context}

Return the answer in this format:

# Project Overview

## Purpose
What does this project do?

## Tech Stack
- item
- item

## Main Modules
- item
- item

## API Endpoints
- endpoint

## Database Models
- model

## Architecture

Frontend
↓
Routes
↓
Controllers
↓
Database

## Key Features
- item
- item

Keep the answer beginner friendly.
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