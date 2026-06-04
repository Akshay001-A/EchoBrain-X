const Snippet = require("../models/Snippet");

const getProjectFiles = async (req, res) => {
  try {
    const { projectId } = req.params;

    const snippets = await Snippet.find({
      projectId,
      userId: req.user.id,
    });

    const files = [
      ...new Set(
        snippets.map((s) => s.filePath)
      ),
    ];

    res.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getFileCode = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { filePath } = req.body;

    const snippets = await Snippet.find({
      projectId,
      userId: req.user.id,
      filePath,
    });

    const code = snippets
      .map((s) => s.code)
      .join("\n\n");

    res.json({
      success: true,
      code,
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
  getProjectFiles,
  getFileCode,
};