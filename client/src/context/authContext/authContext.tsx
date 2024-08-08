import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { AUTH_ACTIONS, AuthAction, AuthState } from "./authContextTypes";
import ManageLocalStorage, { localStorageKeys } from "../../utilities/ManageLocalStorage";


const { userIdKey } = localStorageKeys;


const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            ManageLocalStorage.set(userIdKey, action.payload.userId);
            return { ...state, user: action.payload };
        case AUTH_ACTIONS.LOGIN_FAILURE:
            return { ...state, error: action.payload };
        case AUTH_ACTIONS.FETCH_USER:
            return { ...state, user: action.payload };
        case AUTH_ACTIONS.LOGOUT:
            ManageLocalStorage.delete(userIdKey);
            return { ...state, user: null };
        default:
            return state;
    };
};

const AuthContext = createContext<{ state: AuthState, dispatch: React.Dispatch<AuthAction> } | undefined>(undefined)

const intialState: AuthState = {
    user: null,
    error: false,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, intialState);


    useEffect(() => {

        const value = ManageLocalStorage.get(userIdKey);

        if (!value) dispatch({ type: AUTH_ACTIONS.LOGOUT });

        console.log(value);

    }, [])

    const memoizedValue = useMemo(() => ({
        state: {
            user: state.user,
            error: state.error,
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
