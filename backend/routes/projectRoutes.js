const express = require("express");
const router = express.Router();

const multer = require("multer");

const protect = require("../middleware/authMiddleware");

const {
    uploadProject,
    getProjectSnippets,
    getProjects,
    deleteProject,
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
    "/",
    protect,
    getProjects
);

router.get(
    "/:projectId/snippets",
    protect,
    getProjectSnippets
);

router.delete(
    "/:projectId",
    protect,
    deleteProject
);

module.exports = router;