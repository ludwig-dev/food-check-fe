import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
    children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
    const { user, loading } = useSelector((state: RootState) => state.user);

    if (loading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login" replace />;

    if (user.role !== "ADMIN") return <Navigate to="/register" replace />;

    return <>{children}</>;
};

export default AdminRoute;
