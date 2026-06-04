const Project = require("../models/Project");

const fs = require("fs");

const Snippet = require("../models/Snippet");

const extractZip = require("../utils/extractZip");
const readProjectFiles = require("../utils/readProjectFiles");
const chunkCode = require("../utils/chunkCode");

const uploadProject = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No ZIP file uploaded",
            });
        }

        const project = await Project.create({
            userId: req.user.id,
            projectName: req.body.projectName,
            originalFileName: req.file.originalname,
        });

        const extractedPath = extractZip(
            req.file.path
        );

        const files =
            readProjectFiles(extractedPath);

        let totalChunks = 0;

        for (const filePath of files) {
            const content = fs.readFileSync(
                filePath,
                "utf8"
            );

            const chunks =
                chunkCode(content);

            for (
                let i = 0;
                i < chunks.length;
                i++
            ) {
                await Snippet.create({
                    userId: req.user.id,
                    projectId: project._id,
                    filePath,
                    language: "unknown",
                    chunkIndex: i,
                    code: chunks[i],
                });

                totalChunks++;
            }
        }

        res.status(201).json({
            success: true,
            message:
                "Project indexed successfully",
            totalFiles: files.length,
            totalChunks,
            project,
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
    uploadProject,
};