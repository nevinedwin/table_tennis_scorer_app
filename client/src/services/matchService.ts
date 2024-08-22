import api from './axiosService.js';


export const endpoints = {
    CREATE: "match/create",
    LIST: "match/list",
    EDIT: "match/update",
    DELETE: "match/delete"
}

export enum MatchStatus {
    Live = "LIVE",
    Finished = "FINISHED",
    Pending = "PENDING",
    Cancelled = "Cancelled"
};

export type MatchStatusType = MatchStatus.Live | MatchStatus.Cancelled | MatchStatus.Finished | MatchStatus.Pending;


export type MatchType = {
    team1Id: string;
    team2Id: string;
    team1SetScore: number;
    team2SetScore: number;
    matchStatus: MatchStatusType;
    matchResult: string;
    votingStarted: boolean;
    team1Voting: number;
    team2Voting: number;
    totalVoting: number;
    matchNumber: string;
    date: Date;
};

// create match
export const createMatch = async (data: MatchType) => {
    const res: any = await api.post(endpoints.CREATE, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};
