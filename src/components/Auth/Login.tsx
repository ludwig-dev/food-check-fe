import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Slices/authSlice";
import { fetchUserProfile } from "../../redux/Slices/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

import UserIcons from "../Shared/UserIcons";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, user } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const result = await dispatch(login({ email, password }));

        if (result.meta.requestStatus === "fulfilled") {
            const profileResult = await dispatch(fetchUserProfile());
            if (profileResult.meta.requestStatus === "fulfilled") {
                navigate("/profile");
            }
        } else {
            setMessage("❌ " + (result.payload as string));
        }
    };

    if (user) {
        return (
            <div className="px-4 py-16 flex justify-center">

                <div className="bg-white shadow-md p-6 rounded-xl max-w-md text-center">
                    <p className="text-lg font-medium text-gray-700">You're already logged in!</p>
                    <p className="text-sm text-gray-500 mt-2">
                        Click{" "}
                        <a href="/profile" className="text-blue-600 hover:underline">
                            here
                        </a>{" "}
                        to go to your profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AuthForm
            title="Login"
            fields={[
                {
                    icon: UserIcons.Email,
                    type: "email",
                    value: email,
                    onChange: setEmail,
                    placeholder: "Email",
                    ariaLabel: "Email",
                },
                {
                    icon: UserIcons.Lock,
                    type: "password",
                    value: password,
                    onChange: setPassword,
                    placeholder: "Password",
                    ariaLabel: "Password",
                },
            ]}
            onSubmit={handleSubmit}
            message={message}
            submitLabel="Login"
            loading={loading}
        />
    );
};

export default Login;
