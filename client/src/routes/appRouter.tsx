import React, { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoute";
import { UserRole } from "../context/authContext/authContextTypes";
import { useAuth } from "../context/authContext/authContext";
import Footer from "../components/footer/footer";

const Login = lazy(() => import("../pages/login/login"));
const Dashboard = lazy(() => import("../pages/dashboard/dashboard"));
const PredictionScoreBoard = lazy(() => import("../pages/predictionScoreBoard/predictionScoreBoard"));

export const ROUTES = {
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    PREDICTION_SCOREBOARD: "/prediction_scores"
}

const AppRouter: React.FC = () => {

    const { state: { user } } = useAuth();

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <Routes>
                {/* public routes */}
                <Route path={ROUTES.LOGIN} element={user ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Login />} />


                {/* user and admin routes */}
                <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.USER, UserRole.SUPER_ADMIN]} />}>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.PREDICTION_SCOREBOARD} element={<PredictionScoreBoard />} />

                    {/* admin route */}
                    <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
                    </Route>

                    <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                </Route>

                <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />

            </Routes>
            {user && <div className="block lg:hidden">
                <Footer />
            </div>}
        </Suspense>
    );
};

export default AppRouter