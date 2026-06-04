import axios from "axios";

const API_URL =
  "http://localhost:5000/api/summary";

export const getProjectSummary =
  async (projectId) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        API_URL,
        { projectId },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};