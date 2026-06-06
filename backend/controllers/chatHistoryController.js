const Chat = require("../models/Chat");

const getChatHistory = async (req, res) => {
    try {
        const { projectId } = req.params;

        const chats = await Chat.find({
            userId: req.user.id,
            projectId,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            chats,
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
    getChatHistory,
};