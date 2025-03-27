import axios from "axios";

const API_ADMIN = "http://localhost:8080/api/admin";

export const getAllUsers = async () => {
    const response = await axios.get(`${API_ADMIN}/users`, { withCredentials: true });
    return response.data;
};

export const setRoleToAdmin = async (userId: number) => {
    const response = await axios.put(`${API_ADMIN}/set-admin`, { id: userId }, { withCredentials: true });
    return response.data;
};

export const setRoleToUser = async (userId: number) => {
    const response = await axios.put(`${API_ADMIN}/set-user`, { id: userId }, { withCredentials: true });
    return response.data;
};

export const deleteUser = async (userId: number) => {
    const response = await axios.delete(`${API_ADMIN}/delete-user`, { data: { id: userId }, withCredentials: true });
    return response.data;
};

export const searchByUsername = async (username: string) => {
    const response = await axios.get(`${API_ADMIN}/search/username?username=${username}`, { withCredentials: true });
    return response.data;
};
