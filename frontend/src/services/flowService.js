import axios from "axios";

const API_URL =
    "http://localhost:5000/api/flow";

export const analyzeFlow = async (
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