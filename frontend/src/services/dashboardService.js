import axios from "axios";

const API_URL =
    "http://localhost:5000/api/dashboard/stats";

export const getDashboardStats =
    async () => {
        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(API_URL, {
                headers: {
                    Authorization:
                        `Bearer ${token}`,
                },
            });

        return response.data;
    };