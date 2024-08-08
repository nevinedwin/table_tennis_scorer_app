import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { User, UserRole } from "./authContextTypes";
import ENDPOINTS from "../../utilities/endpoints";
import { getConfig } from "../../utilities/config";
import axios from "axios";

const config = getConfig();

type AuthState = {
    user: User | null;
    error: string | null;
    login?: () => void;
    logout?: () => void;
};

type AuthAction =
    | { type: 'SET_USER'; payload: User }
    | { type: 'SET_ERROR'; payload: string }
    | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload, error: null };
        case 'SET_ERROR':
            return { ...state, error: action.payload, user: null };
        case 'LOGOUT':
            return { user: null, error: null };
        default:
            return state;
    }
};

const AuthContext = createContext<AuthState | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, error: null });

    const login = useCallback(() => {
        window.open(`${config.BASE_URL}${ENDPOINTS.LOGIN}`, "_self");
    }, []);

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        window.open(`${config.BASE_URL}${ENDPOINTS.LOGOUT}`, "_self");
    }, []);

    const getUser = useCallback(async () => {
        try {
            const resp = await axios.get(`${config.BASE_URL}${ENDPOINTS.GET_USER}`, { withCredentials: true });
            const userData = resp.data.data || resp.data;
            const userDataErr = resp.data.data.error || "";

            console.log("csbjdkv", userDataErr);

            if (userDataErr || userData?.email?.endsWith('@inapp.com')) {
                dispatch({ type: 'SET_ERROR', payload: userDataErr || 'Please use a company email address to log in.' });
            } else {
                dispatch({ type: 'SET_USER', payload: userData });
            }
        } catch (error) {
            console.error("Failed to fetch user:", error);
            dispatch({ type: 'SET_ERROR', payload: 'Error fetching user data.' });
        }
    }, [logout]);

    useEffect(() => {
        if (state.user === null && state.error === null) {
            getUser();
            console.log(state);
        }
    }, [state.user, getUser]);

    const memoizedValue = useMemo(() => ({
        user: state.user,
        error: state.error,
        login,
        logout
    }), [state.user, state.error, login, logout]);

    return (
        <AuthContext.Provider value={memoizedValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("Use Auth state must be within a auth provider");
    }
    return context;
};
