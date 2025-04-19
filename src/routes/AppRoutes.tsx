import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Profile from "../components/Profile/Profile";
import PrivateRoute from "../components/Auth/PrivateRoute";
import Register from "../components/Auth/Register";
import AdminPage from "../components/Admin/AdminPage";
import AdminRoute from "../components/Admin/adminRoute";
import Home from "../components/Shared/Home";
import RecipeList from "../components/Recipes/RecipeList";
import RecipeDetails from "../components/Recipes/RecipeDetails";
import PublishedRecipesPage from "../components/publishedRecipes/PublishedRecipesPage";

const AppRoutes = () => (
    <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* Users Routes */}
        <Route
            path="/profile"
            element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            }
        />
        <Route
            path="/recipes"
            element={
                <PrivateRoute>
                    <RecipeList />
                </PrivateRoute>
            }
        />
        <Route
            path="/recipes/:id"
            element={
                <PrivateRoute>
                    <RecipeDetails />
                </PrivateRoute>
            }
        />
        <Route
            path="/recipes/explore"
            element={
                <PrivateRoute>
                    <PublishedRecipesPage />
                </PrivateRoute>
            }
        />

        {/* Admin Routes */}
        <Route
            path="/admin/dashboard"
            element={
                <AdminRoute>
                    <AdminPage />
                </AdminRoute>
            }
        />

        <Route path="/unauthorized" element={<Register />} />
    </Routes>
);

export default AppRoutes;
