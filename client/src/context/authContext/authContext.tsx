import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { AUTH_ACTIONS, AuthAction, AuthState, CurrentUserType } from "./authContextTypes";
import ManageLocalStorage, { localStorageKeys } from "../../utilities/ManageLocalStorage";
import { Hub } from "aws-amplify/utils";
import { getCurrentUser, signOut } from "@aws-amplify/auth";
import { useSocket } from "../websocketContext/websocketContext";
import useUserApi from "../../hooks/apiHooks/useUserApi";

const { userIdKey } = localStorageKeys;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_STARTS:
            return { ...state, isLoginStarts: action.payload };
        case AUTH_ACTIONS.LOGIN_SUCCESS:
            ManageLocalStorage.set(userIdKey, action.payload);
            return { ...state, userId: action.payload };
        case AUTH_ACTIONS.LOGIN_FAILURE:
            return { ...state, error: action.payload, isLoginStarts: false };
        case AUTH_ACTIONS.FETCH_USER:
            return { ...state, user: action.payload };
        case AUTH_ACTIONS.LOGOUT:
            ManageLocalStorage.clear();
            return { ...state, user: null, userId: null, isLoginStarts: false };
        default:
            return state;
    };
};

const AuthContext = createContext<{ state: AuthState, dispatch: React.Dispatch<AuthAction> } | undefined>(undefined)

const intialState: AuthState = {
    user: null,
    error: false,
    isLoginStarts: false,
    userId: null
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const { fetchSingleUser, getSocketUrl } = useUserApi();
    const { onConnect } = useSocket();

    const [state, dispatch] = useReducer(authReducer, intialState);
    const [fetchUserFlag, setFetchUserFlag] = useState(false);

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload }) => {
            switch (payload.event) {
                case "signInWithRedirect":
                    if (!state.userId) {
                        getUser();
                    }
                    break;
                case "signInWithRedirect_failure":
                    break;
                case "customOAuthState":
                    break;
            }
        });

        return unsubscribe;
    }, []);

    useEffect(() => {

        async function fetchUser(userId: string) {
            try {
                if (!state.user && !fetchUserFlag) {
                    setFetchUserFlag(true);
                    const data = await fetchSingleUser(userId);
                    dispatch({ type: AUTH_ACTIONS.FETCH_USER, payload: data });
                    setFetchUserFlag(false);
                }
                // const data = await fetchSingleUser(userId);
                // dispatch({ type: AUTH_ACTIONS.FETCH_USER, payload: data });
                // dispatch({ type: AUTH_ACTIONS.LOGIN_STARTS, payload: false });
            } catch (error) {
                // error showing
                setFetchUserFlag(false);
                dispatch({ type: AUTH_ACTIONS.LOGOUT });
            };
        };

        async function fetchSocket() {
            console.log("nevinedwin");
            try {
                // const socketData: any = await getSocketUrl();
                getSocketUrl().then(
                    socketData => {
                        if (socketData?.socketUrl) {
                            onConnect(socketData.socketUrl);
                        }
                    }
                );
                // if (socketData?.socketUrl) {
                //     onConnect(socketData.socketUrl);
                // }

            } catch (error) {
                console.log(error);
            }
        }

        const userId = ManageLocalStorage.get(userIdKey) as string || null;

        if (userId && !state.user && !state.isLoginStarts) {
            fetchUser(userId);
            setFetchUserFlag(false);
            fetchSocket();

        };

    }, [fetchUserFlag, state.user, state.isLoginStarts])


    const getUser = async (): Promise<void> => {
        try {

            const currentUser: CurrentUserType = await getCurrentUser();

            const { userId } = currentUser;

            if (userId) {

                dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userId });

                // const socketData: any = await getSocketUrl();

                // if (socketData.socketUrl) {
                //     onConnect(socketData.socketUrl);
                // }

                getSocketUrl().then(
                    socketData => {
                        if (socketData?.socketUrl) {
                            onConnect(socketData.socketUrl);
                        }
                    }
                );
            } else {

                signOut();
                dispatch({ type: AUTH_ACTIONS.LOGOUT });
            };

            setFetchUserFlag(true);

        } catch (error) {
            // error showing
            console.log(error);
            console.log("Not signed in");
        };
    };

    const memoizedValue = useMemo(() => ({
        state: {
            user: state.user,
            error: state.error,
            isLoginStarts: state.isLoginStarts,
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
