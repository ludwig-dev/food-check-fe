import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./redux/Slices/userSlice";
import { AppDispatch, RootState } from "./redux/store";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Shared/NavBar";

const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.user);
    const hasFetched = useRef(false);


    useEffect(() => {
        if (!hasFetched.current && !user) {
            dispatch(fetchUserProfile());
            hasFetched.current = true;
        }
    }, [dispatch]);

    //console.log("👤 User state in Redux:", user);

    return (
        <>
            <Navbar />
            <AppRoutes />
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </>
    );
};

export default App;
