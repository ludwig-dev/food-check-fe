import React from "react";
import { User } from "../../redux/Slices/userSlice";
import { setRoleToAdmin, setRoleToUser, deleteUser } from "../../service/adminService";

interface UserTableProps {
    users: User[];
    refreshUsers: () => void;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const UserTable: React.FC<UserTableProps> = ({ users, refreshUsers, setMessage }) => {
    const handleSetRole = async (userId: number, role: string) => {
        try {
            role === "ADMIN"
                ? await setRoleToAdmin(userId)
                : await setRoleToUser(userId);
            refreshUsers();
        } catch (err) {
            setMessage(`❌ Failed to set role to ${role}`);
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUser(userId);
            refreshUsers();
        } catch (err) {
            setMessage("❌ Failed to delete user");
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm text-sm">
                <thead className="bg-gray-100 text-gray-700 font-medium">
                    <tr>
                        <th className="text-left px-4 py-3 border-b">Username</th>
                        <th className="text-left px-4 py-3 border-b">ID</th>
                        <th className="text-left px-4 py-3 border-b">Email</th>
                        <th className="text-left px-4 py-3 border-b">Role</th>
                        <th className="text-left px-4 py-3 border-b">Set Role</th>
                        <th className="text-left px-4 py-3 border-b">Delete User</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border-b">{user.username}</td>
                            <td className="px-4 py-3 border-b">{user.id}</td>
                            <td className="px-4 py-3 border-b">{user.email}</td>
                            <td className="px-4 py-3 border-b">{user.role}</td>
                            <td className="px-4 py-3 border-b">
                                {user.role === "ADMIN" ? (
                                    <button
                                        onClick={() => handleSetRole(user.id, "USER")}
                                        className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                                    >
                                        Set as User
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleSetRole(user.id, "ADMIN")}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                    >
                                        Set as Admin
                                    </button>
                                )}
                            </td>
                            <td className="px-4 py-3 border-b">
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
