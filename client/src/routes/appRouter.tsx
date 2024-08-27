import React, { lazy, Suspense, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoute";
import { UserRole } from "../context/authContext/authContextTypes";
import { useAuth } from "../context/authContext/authContext";
import ErrorBoundary from "../components/errorBoundary/errorBoundary";
import { fetchAuthSession, JWT } from "@aws-amplify/auth";

const Login = lazy(() => import("../pages/login/login"));
const Dashboard = lazy(() => import("../pages/dashboard/dashboard"));
const PredictionScoreBoard = lazy(() => import("../pages/predictionScoreBoard/predictionScoreBoard"));
const Options = lazy(() => import("../pages/options/options"));
const Scoreboard = lazy(() => import("../pages/scoreboard/scoreboard"));

export const ROUTES = {
    LOGIN: "/login",
    DASHBOARD: "/dashboard",
    PREDICTION_SCOREBOARD: "/prediction_scores",
    OPTIONS: "/options",
    SCOREBOARD: "/scoreboard"
}

const AppRouter: React.FC = () => {

    const { state: { user } } = useAuth();

    return (
        <Suspense fallback={<div>Loading....</div>}>
            <ErrorBoundary fallback={<div>Something went wrong. Please try again later.</div>}>
                <Routes>
                    {/* public routes */}
                    <Route path={ROUTES.LOGIN} element={user ? <Navigate to={ROUTES.DASHBOARD} replace /> : <Login />} />


                    {/* user and admin routes */}
                    <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.USER, UserRole.SUPER_ADMIN]} />}>
                        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                        <Route path={ROUTES.PREDICTION_SCOREBOARD} element={<PredictionScoreBoard />} />
                        <Route path={ROUTES.SCOREBOARD} element={<Scoreboard />} />

                        {/* admin route */}
                        <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN]} />}>
                        </Route>

                        {/* super admin route */}
                        <Route element={<ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]} />}>
                            <Route path={ROUTES.OPTIONS} element={<Options />} />
                        </Route>

                        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
                    </Route>

                    <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />

                </Routes>
                {/* {user && <div className="block lg:hidden">
                <Footer />
            </div>} */}
            </ErrorBoundary>
        </Suspense>
    );
};

export default AppRouter