const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    chatWithProject,
} = require("../controllers/chatController");

router.post(
    "/",
    protect,
    chatWithProject
);

module.exports = router;