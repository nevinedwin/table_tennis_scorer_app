
export enum UserRole {
    USER = "user",
    ADMIN = "admin",
    SUPER_ADMIN = "superAdmin"
}

export enum AUTH_ACTIONS {
    LOGIN_STARTS = "login_start",
    LOGIN_SUCCESS = "login_success",
    LOGIN_FAILURE = "login_failure",
    FETCH_USER = "fetch_user",
    LOGOUT = "logout"
};

export interface User {
    teamId?: string,
    role: UserRole,
    userId: string;
    displayName: string;
    email: string;
    predictionsWin: number;
    predictionsLose: number;
    totalPredictions: number;
}

export type AuthContextType = {
    user: User | null;
    error: Error | string | null;
};

export type AuthState = {
    user: User | null;
    error: any;
    isLoginStarts: boolean;
    userId: string | null;
};

export type AuthAction =
    | { type: AUTH_ACTIONS.LOGIN_STARTS, payload: boolean }
    | { type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: string }
    | { type: AUTH_ACTIONS.LOGOUT }
    | { type: AUTH_ACTIONS.LOGIN_FAILURE, payload: any }
    | { type: AUTH_ACTIONS.FETCH_USER, payload: User }

    
export type CurrentUserType = {
    username: string;
    userId: string
};