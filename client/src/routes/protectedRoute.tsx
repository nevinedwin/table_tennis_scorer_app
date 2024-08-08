import React from "react"
import { UserRole } from "../context/authContext/authContextTypes"
import { useAuth } from "../context/authContext/authContext"
import { Navigate, Outlet } from "react-router-dom"


interface ProtectedRouteProps {
    allowedRoles: UserRole[]
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {

    const { user } = useAuth();

    if (!user) return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />

    return <Outlet />
};

export default ProtectedRoute