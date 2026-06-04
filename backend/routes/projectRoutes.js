const express = require("express");
const router = express.Router();

const multer = require("multer");

const protect = require("../middleware/authMiddleware");

const {
  uploadProject,
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

module.exports = router;