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

    res.status(200).json({
      success: true,
      totalResults: snippets.length,
      snippets,
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