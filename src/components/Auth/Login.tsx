import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/Slices/authSlice";
import { fetchUserProfile } from "../../redux/Slices/userSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import toast from "react-hot-toast";
import UserIcons from "../Shared/Icons/UserIcons";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, user } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(login({ email, password }))
            .unwrap()
            .then(() => {
                dispatch(fetchUserProfile())
                    .unwrap()
                    .then(() => {
                        toast.success("Inloggning lyckades!");
                        navigate("/profile");
                    })
                    .catch(() => {
                        toast.error("Kunde inte hämta användarprofilen");
                    });
            })
            .catch((error: any) => {
                toast.error("Inloggning misslyckades: " + error);
            });
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
            submitLabel="Login"
            loading={loading}
        />
    );
};

export default Login;
