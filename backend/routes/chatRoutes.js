const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    chatWithProject,
    getTotalChats,
} = require("../controllers/chatController");

router.post(
    "/",
    protect,
    chatWithProject
);

router.get(
    "/count",
    protect,
    getTotalChats
);

module.exports = router;