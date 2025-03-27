import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { user, loading } = useSelector((state: RootState) => state.user);

    //if (loading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

export default PrivateRoute;
