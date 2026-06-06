import axios from "axios";

const API_URL =
    "http://localhost:5000/api/chat";

export const askQuestion = async (
    projectId,
    question
) => {
    const token =
        localStorage.getItem("token");

    const response =
        await axios.post(
            API_URL,
            {
                projectId,
                question,
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            }
        );

    return response.data;
};

export const getTotalChats =
    async () => {
        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(
                `${API_URL}/count`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };


export const getChatHistory =
    async (projectId) => {
        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(
                `${API_URL}/history/${projectId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };    