import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import { AUTH_ACTIONS, AuthAction, AuthState } from "./authContextTypes";
import ManageLocalStorage, { localStorageKeys } from "../../utilities/ManageLocalStorage";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser } from "@aws-amplify/auth";

const { userIdKey } = localStorageKeys;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_STARTS:
            return { ...state, isLoginStarts: action.payload };
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            // ManageLocalStorage.set(userIdKey, { id: action.payload.userId, token: action.payload.token });
            return { ...state, token: action.payload, isLoginStarts: false };
        case AUTH_ACTIONS.LOGIN_FAILURE:
            return { ...state, error: action.payload, isLoginStarts: false };
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
    isLoginStarts: false,
    token: null,
    userId: null
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, intialState);

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload }) => {
            switch (payload.event) {
                case "signInWithRedirect":
                    getUser();
                    break;
                case "signInWithRedirect_failure":
                    break;
                case "customOAuthState":
                    break;
            }
        });
        
        return unsubscribe;
    }, []);

    const getUser = async (): Promise<void> => {
        try {
            const currentUser = await getCurrentUser();
            console.log("currentUser", currentUser);
        } catch (error) {
            console.error(error);
            console.log("Not signed in");
        }
    };

    const memoizedValue = useMemo(() => ({
        state: {
            user: state.user,
            error: state.error,
            isLoginStarts: state.isLoginStarts,
            token: state.token,
            userId: state.userId
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
