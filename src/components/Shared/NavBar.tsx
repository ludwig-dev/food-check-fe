import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logout } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(logout())
        .unwrap()
        .then(() => {
            toast.success("Utloggning lyckades!");
        })
        .catch((error: any) => {
            toast.error("Misslyckades: " + error);
        });
    };

    return (
        <nav className="bg-white shadow-sm px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold text-blue-600">
                    food-check
                </Link>

                <ul className="flex items-center gap-6 text-sm text-gray-700">
                    <li>
                        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    </li>

                    {user ? (
                        <>
                            <li>
                                <Link to="/recipes" className="hover:text-blue-600 transition">
                                    Recipes
                                </Link>
                            </li>

                            <li>
                                <Link to="/recipes/explore" className="hover:text-blue-600 transition">
                                    Find Recipes
                                </Link>
                            </li>

                            {user.role === "ADMIN" && (
                                <li>
                                    <Link to="/admin/dashboard" className="hover:text-blue-600 transition">
                                        Admin
                                    </Link>
                                </li>
                            )}

                            <li>
                                <Link to="/profile" className="hover:text-blue-600 transition">
                                    Profile
                                </Link>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 hover:text-red-600 transition"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
