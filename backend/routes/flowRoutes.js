const express = require("express");

const router = express.Router();

const protect =
    require("../middleware/authMiddleware");

const {
    analyzeCodeFlow,
} = require("../controllers/flowController");

router.post(
    "/",
    protect,
    analyzeCodeFlow
);

module.exports = router;