import { Moment } from "moment";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface User {
    id?: string,
    name?: string,
    teamId?: string,
    role: UserRole,
    cdt?: Moment,
    mdt?: Moment,
    totalPrediction?: number,
    correctPrediction?: number
}

export type AuthContextType = {
    user: User | null;
    login: () => void;
    logout: () => void;
    error: Error | string | null;
};