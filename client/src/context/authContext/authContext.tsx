import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { AUTH_ACTIONS, AuthAction, AuthState } from "./authContextTypes";
import ManageLocalStorage, { localStorageKeys } from "../../utilities/ManageLocalStorage";
import { fetchUser } from "../../services/userService";


const { userIdKey } = localStorageKeys;


const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            ManageLocalStorage.set(userIdKey, { id: action.payload.userId, token: action.payload.token });
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


        async function handleFetchUser(userId: string) {
            try {

                const resp = await fetchUser(userId);
                dispatch({ type: AUTH_ACTIONS.FETCH_USER, payload: (resp as any)?.data })

            } catch (error) {

                if ((error as any).response.status === 403) {
                    dispatch({ type: AUTH_ACTIONS.LOGOUT });
                };
            }
        };

        const value = ManageLocalStorage.get(userIdKey);

        if (!value) dispatch({ type: AUTH_ACTIONS.LOGOUT });

        const id = (value as any)?.id;

        if (id) {
            if (!state.user) {
                handleFetchUser(id);
            }
        };

    }, []);

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
