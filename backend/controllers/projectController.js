const Project = require("../models/Project");

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

    res.status(201).json({
      success: true,
      message: "Project uploaded successfully",
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