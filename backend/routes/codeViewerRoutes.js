const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  getProjectFiles,
  getFileCode,
} = require("../controllers/codeViewerController");

router.get(
  "/:projectId/files",
  protect,
  getProjectFiles
);

router.post(
  "/:projectId/file",
  protect,
  getFileCode
);

module.exports = router;