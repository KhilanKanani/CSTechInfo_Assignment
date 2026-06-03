import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, roles = [] }) => {

    const location = useLocation();
    const { Userdata } = useSelector(state => state.User);

    if (!Userdata) {
        if (location.pathname !== "/" && location.pathname !== "/login") {
            return <Navigate to="/login" state={{ from: location }} replace />;
        }

        return children;
    }

    const role = Userdata?.user?.role;

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    // Role restriction
    if (roles.length > 0 && !roles.includes(role)) {
        return <Navigate to="/notFound" replace />;
    }

    return children;
};

export default ProtectedRoute; 