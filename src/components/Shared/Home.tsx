import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home = () => {

    const { user } = useSelector((state: RootState) => state.user);

    if (user) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 pt-20">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to food-check 👋</h1>
                    <p className="text-gray-600 mb-2">You are signed in</p>
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

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 pt-20">

                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to food-check 👋</h1>
                    <p className="text-gray-600 mb-8">Manage your recipes and check your nutrition</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/login"
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300 transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;
