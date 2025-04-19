import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { register } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";
import UserIcons from "../Shared/Icons/UserIcons";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(register({ email, username, password }))
            .unwrap()
            .then(() => {
                toast.success("Registrering lyckades!");
                navigate("/login");
            })
            .catch((error: any) => {
                toast.error("Registrering misslyckades: " + error);
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
            title="Create Account"
            fields={[
                {
                    icon: UserIcons.UserHead,
                    type: "text",
                    value: username,
                    onChange: setUsername,
                    placeholder: "Username",
                    ariaLabel: "Username",
                },
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
            onSubmit={handleRegister}
            submitLabel="Register"
            footer={
                <p className="text-sm text-gray-800 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
            }
        />
    );
};

export default Register;
