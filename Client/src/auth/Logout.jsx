import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUserdata } from "../Redux/UserSlice";
import { SERVER_URL } from "../main";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const logoutUser = async () => {
            const toastId = toast.loading("Logging out...");

            try {
                await axios.post(`${SERVER_URL}/api/auth/logout`, {}, { withCredentials: true });
                toast.success("Logged out successfully", { id: toastId });
                dispatch(setUserdata(null));

                navigate("/login", { replace: true });
            }

            catch (error) {
                toast.error("Logout failed", { id: toastId });
                console.error("Logout error:", error);
            }
        };

        logoutUser();

    }, [dispatch]);

    return null;
};

export default Logout;