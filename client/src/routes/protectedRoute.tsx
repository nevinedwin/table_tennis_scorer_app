import React from "react"
import { UserRole } from "../context/authContext/authContextTypes"
import { useAuth } from "../context/authContext/authContext"
import { Navigate, Outlet } from "react-router-dom"
import ManageLocalStorage, { localStorageKeys } from "../utilities/ManageLocalStorage"


interface ProtectedRouteProps {
    allowedRoles: UserRole[]
};



const { token } = localStorageKeys;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    
    const IdToken = ManageLocalStorage.get(token) as string
    
    const { state: { user } } = useAuth();
    
    if (!IdToken) return <Navigate to="/login" replace />;

    if (user && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />

    return <Outlet />
};

export default ProtectedRoute