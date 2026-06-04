import axios from "axios";

const API_URL =
    "http://localhost:5000/api/project";

/**
 * Upload Project ZIP
 */
export const uploadProject = async (
    file,
    projectName
) => {
    const token =
        localStorage.getItem("token");

    if (!token) {
        throw new Error(
            "Please login first"
        );
    }

    const formData = new FormData();

    formData.append(
        "projectZip",
        file
    );

    formData.append(
        "projectName",
        projectName
    );

    const response =
        await axios.post(
            `${API_URL}/upload`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    return response.data;
};

/**
 * Get All Projects
 */
export const getProjects =
    async () => {
        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(
                API_URL,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };

/**
 * Get Project Snippets
 */
export const getProjectSnippets =
    async (projectId) => {
        const token =
            localStorage.getItem("token");

        const response =
            await axios.get(
                `${API_URL}/${projectId}/snippets`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };

/**
 * Delete Project
 */
export const deleteProject =
    async (projectId) => {
        const token =
            localStorage.getItem("token");

        const response =
            await axios.delete(
                `${API_URL}/${projectId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };