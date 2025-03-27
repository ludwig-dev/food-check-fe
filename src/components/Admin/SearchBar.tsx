import React, { useState, FormEvent } from "react";
import UserIcons from "../Shared/UserIcons";

interface SearchBarProps {
    onSearch: (username: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [username, setUsername] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(username);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                placeholder="Search by username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 flex-1"
            />
            <button
                type="submit"
                className=""
            >
                <UserIcons.Search size={34} className="opacity-80" />
            </button>

        </form>
    );
};

export default SearchBar;
