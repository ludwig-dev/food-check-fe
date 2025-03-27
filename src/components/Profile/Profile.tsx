import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateUsername, updateEmail } from "../../redux/Slices/userSlice";
import EditableField from "./EditableField";
import MessageBanner from "../Shared/MessageBanner";
import UserIcons from "../Shared/UserIcons";


const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.user);

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [message, setMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleUsernameUpdate = async () => {
        setMessage("");
        const result = await dispatch(updateUsername(username));
        if (updateUsername.fulfilled.match(result)) {
            setMessage("✅ Username updated successfully!");
            setIsEditing(false);
        } else {
            setMessage("❌ " + (result.payload as string));
        }
    };

    const handleEmailUpdate = async () => {
        setMessage("");
        const result = await dispatch(updateEmail(email));
        if (updateEmail.fulfilled.match(result)) {
            setMessage("✅ Email updated successfully!");
            setIsEditing(false);
        } else {
            setMessage("❌ " + (result.payload as string));
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (!user) return <p className="text-center text-red-500">User not logged in</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            {/* Welcome */}
            <h2 className="text-4xl font-semibold text-center text-gray-900 mb-10">
                Welcome, <span className="text-blue-600">{user.username}</span>
            </h2>

            <MessageBanner message={message} />

            {/* Account Info header with edit toggle */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Account Info</h3>
                <button onClick={() => setIsEditing((prev) => !prev)}>
                    <UserIcons.Edit size={20} className="w-5 h-5 mr-3" />
                </button>
            </div>

            <EditableField
                label="Username"
                value={username}
                onChange={setUsername}
                onSave={handleUsernameUpdate}
                isEditing={isEditing}
                Icon={UserIcons.UserHead}
            />
            <EditableField
                label="Email"
                value={email}
                onChange={setEmail}
                onSave={handleEmailUpdate}
                isEditing={isEditing}
                Icon={UserIcons.Email}
            />

            <div className="flex items-center gap-3 mb-4">
                <UserIcons.Briefcase size={20} className="w-5 h-5 mr-3" />
                <p className="text-sm text-gray-800">{user.role}</p>
            </div>

            <div className="flex items-center gap-3 mb-4">
                <UserIcons.Hashtag size={20} className="w-5 h-5 mr-3" />
                <p className="text-sm text-gray-800">{user.id}</p>
            </div>
        </div>
    );
};

export default Profile;