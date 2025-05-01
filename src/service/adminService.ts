import axios from "axios";
import { User } from "../redux/Slices/userSlice";

const API_ADMIN = "http://localhost:8080/api/admin/users";
// fetch all or search
export const getAllUsers = async (username?: string): Promise<User[]> => {
    const url = username
        ? `${API_ADMIN}?username=${encodeURIComponent(username)}`
        : API_ADMIN;
    const { data } = await axios.get<User[]>(url, { withCredentials: true });
    return data;
};

// set role
export const setUserRole = async (
    userId: number,
    role: "ADMIN" | "USER"
): Promise<User> => {
    const { data } = await axios.patch<User>(
        `${API_ADMIN}/${userId}`,
        { role },
        { withCredentials: true }
    );
    return data;
};

export const setRoleToAdmin = (userId: number) =>
    setUserRole(userId, "ADMIN");

export const setRoleToUser = (userId: number) =>
    setUserRole(userId, "USER");

// delete a user
export const deleteUser = async (userId: number): Promise<void> => {
    await axios.delete(`${API_ADMIN}/${userId}`, { withCredentials: true });
};