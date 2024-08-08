import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { AUTH_ACTIONS, AuthAction, AuthState } from "./authContextTypes";
import ManageLocalStorage, { localStorageKeys } from "../../utilities/ManageLocalStorage";


const { loggedInKey } = localStorageKeys;


const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_STARTS:
            return { ...state, loading: true };
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            ManageLocalStorage.set(loggedInKey, 'true');
            return { ...state, isLoggedIn: true, loading: false };
        case AUTH_ACTIONS.LOGIN_FAILURE:
            return { ...state, error: action.payload, loading: false };
        case AUTH_ACTIONS.FETCH_USER:
            return { ...state, user: action.payload };
        case AUTH_ACTIONS.LOGOUT:
            ManageLocalStorage.set(loggedInKey, 'false');
            return { ...state, user: null, isLoggedIn: false };
        default:
            return state;
    };
};

const AuthContext = createContext<{ state: AuthState, dispatch: React.Dispatch<AuthAction> } | undefined>(undefined)

const intialState: AuthState = {
    user: null,
    error: false,
    loading: false,
    isLoggedIn: false,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, intialState);


    useEffect(() => {

        const value = ManageLocalStorage.get(loggedInKey);

        // debugger
        console.log(value, state.isLoggedIn);

        if (state.isLoggedIn && value) {
            console.log("fetch user");
        };

    }, [state.isLoggedIn])

    const memoizedValue = useMemo(() => ({
        state: {
            user: state.user,
            error: state.error,
            loading: state.loading,
            isLoggedIn: state.isLoggedIn
        },
        dispatch
    }), [state.user, state.error]);

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
