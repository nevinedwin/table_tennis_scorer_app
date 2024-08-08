
export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export enum AUTH_ACTIONS {
    LOGIN_STARTS = "login_start",
    LOGIN_SUCCESS = "login_success",
    LOGIN_FAILURE = "login_failure",
    FETCH_USER = "fetch_user",
    LOGOUT = "logout"
};

type Name = {
    fname: string;
    lname: string;
}

export interface User {
    teamId?: string,
    role: UserRole,
    userId: string;
    displayName: Name;
    email: string;
    image: string;
    predictionWinScore: number;
    predictionLoseScore: number;
    totalPredictions: number;
}

export type AuthContextType = {
    user: User | null;
    error: Error | string | null;
};

export type AuthState = {
    user: User | null;
    error: any;
};

export type AuthAction =
    | { type: AUTH_ACTIONS.LOGIN_STARTS }
    | { type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: User }
    | { type: AUTH_ACTIONS.LOGOUT }
    | { type: AUTH_ACTIONS.LOGIN_FAILURE, payload: any }
    | { type: AUTH_ACTIONS.FETCH_USER, payload: User }