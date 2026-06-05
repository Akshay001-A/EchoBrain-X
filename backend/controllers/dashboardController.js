const Project = require("../models/Project");
const Snippet = require("../models/Snippet");
const Chat = require("../models/Chat");

const getDashboardStats = async (req, res) => {
    try {
        const totalProjects =
            await Project.countDocuments({
                userId: req.user.id,
            });

        const totalSnippets =
            await Snippet.countDocuments({
                userId: req.user.id,
            });

        const totalChats =
            await Chat.countDocuments({
                userId: req.user.id,
            });

        res.status(200).json({
            success: true,
            totalProjects,
            totalSnippets,
            totalChats,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    getDashboardStats,
};