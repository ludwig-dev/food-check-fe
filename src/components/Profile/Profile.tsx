import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateUsername, updateEmail } from "../../redux/Slices/userSlice";
import EditableField from "./EditableField";
import UserIcons from "../Shared/Icons/UserIcons";
import RecipeIcons from "../Shared/Icons/RecipeIcons";
import toast from "react-hot-toast";


const Profile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading } = useSelector((state: RootState) => state.user);

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleUsernameUpdate = async () => {
        dispatch(updateUsername(username))
            .unwrap()
            .then(() => {
                toast.success("Username uppdaterat!");
            })
            .catch((error: any) => {
                toast.error("Misslyckades: " + error);
            });
    };

    const handleEmailUpdate = async () => {
        dispatch(updateEmail(email)).unwrap()
            .then(() => {
                toast.success("Email uppdaterat!");
            })
            .catch((error: any) => {
                toast.error("Misslyckades: " + error);
            });
    };


    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (!user) return <p className="text-center text-red-500">User not logged in</p>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            {/* Welcome */}
            <h2 className="text-4xl font-semibold text-center text-gray-900 mb-10">
                Welcome, <span className="text-blue-600">{user.username}</span>
            </h2>

            {/* Account Info header with edit toggle */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Account Info</h3>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-gray-600 border rounded-md px-2 py-1 hover:bg-gray-200 transition"
                >
                    {isEditing ? <RecipeIcons.Done size={22} className="opacity-100" /> : <UserIcons.Edit size={22} className="opacity-100" />}
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