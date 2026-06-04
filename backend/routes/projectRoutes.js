const express = require("express");
const router = express.Router();

const multer = require("multer");

const protect = require("../middleware/authMiddleware");

const {
    uploadProject,
    getProjectSnippets,
} = require("../controllers/projectController");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({
    storage,
});

router.post(
    "/upload",
    protect,
    upload.single("projectZip"),
    uploadProject
);

router.get(
    "/:projectId/snippets",
    protect,
    getProjectSnippets
);

module.exports = router;