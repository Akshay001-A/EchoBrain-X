const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    generateProjectSummary,
} = require("../controllers/summaryController");

router.post(
    "/",
    protect,
    generateProjectSummary
);

module.exports = router;