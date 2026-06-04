const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    searchSnippets,
} = require("../controllers/searchController");

router.post(
    "/",
    protect,
    searchSnippets
);

module.exports = router;