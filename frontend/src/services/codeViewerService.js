import axios from "axios";

const API_URL =
  "http://localhost:5000/api/code-viewer";

export const getProjectFiles =
  async (projectId) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_URL}/${projectId}/files`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getFileCode =
  async (
    projectId,
    filePath
  ) => {
    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API_URL}/${projectId}/file`,
        { filePath },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };