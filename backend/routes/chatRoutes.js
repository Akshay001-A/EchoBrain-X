const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    chatWithProject,
    getTotalChats,
} = require("../controllers/chatController");

const {
    getChatHistory,
} = require("../controllers/chatHistoryController");

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


router.get(
    "/history/:projectId",
    protect,
    getChatHistory
);
module.exports = router;