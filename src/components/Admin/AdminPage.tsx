import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import SearchBar from "./SearchBar";
import MessageBanner from "../Shared/MessageBanner";
import { User } from "../../redux/Slices/userSlice";
import { getAllUsers, searchByUsername } from "../../service/adminService";

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    //const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            setMessage("❌ Failed to fetch users");
        }
    };

    const handleSearch = async (username: string) => {
        try {
            if (username.trim() === "") {
                fetchUsers();
                return;
            }
            const data = await searchByUsername(username);
            setUsers(data);
        } catch (err) {
            setMessage("❌ Failed to search users");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
                Admin Dashboard
            </h1>
            <MessageBanner message={message} />
            <SearchBar onSearch={handleSearch} />
            <UserTable users={users} refreshUsers={fetchUsers} setMessage={setMessage} />
        </div>
    );
};

export default AdminPage;
