import api from './axiosService.js';


export const endpoints = {
    CREATE: "match/create",
    LIST: "match/list",
    EDIT: "match/update",
    DELETE: "match/delete",
    GET: "match/get",
    UPDATE: "match/update",
    ADDVOTE: "match/addVote",
    GETVOTE: "match/getVote",
    GETFULLMATCH: "match/getFullMatch",
    UPDATESINGLE: "match/updateSingle",
    PLAYGAME: "match/playGame"
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
    date: string;
};

export type MatchListType = {
    matchId: string;
    matchNumber: string;
    date: string;
    team1Id: string;
    team1Name: string;
    team1Player1Name: string;
    team1Player2Name: string;
    team1Set1Score: number;
    team1Set2Score: number;
    team1Set3Score: number;
    team1SetScore: number;
    team1Voting: number;
    team2Id: string;
    team2Name: string;
    team2Player1Name: string;
    team2Player2Name: string;
    team2Set1Score: number;
    team2Set2Score: number;
    team2Set3Score: number;
    team2SetScore: number;
    team2Voting: number;
    votingStarted: boolean;
    totalVoting: number;
    matchResult: string;
    matchStatus: string;
    winner: string;
    set1Winner: string;
    set2Winner: string;
    set3winner: number;
    undoHistory: any;
    currentSet: number;
    team1Point: number;
    team1MatchPlayed: number;
    team1MatchLose: number;
    team1MatchWon: number;
    team2MatchWon: number;
    team2MatchPlayed: number;
    team2Point: number;
    team2MatchLose: number;
}

// create match
export const createMatch = async (data: MatchType) => {
    const res: any = await api.post(endpoints.CREATE, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};

// create match
export const listMatch = async () => {
    const res: any = await api.post(endpoints.LIST, {});
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};

// get match
export const getMatch = async (id: string) => {
    const res: any = await api.get(`${endpoints.GET}/${id}`);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};


// edit match
export const editMatch = async (data: MatchType) => {
    const res: any = await api.post(endpoints.UPDATE, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};

// delete match
export const deleteMatch = async (data: string) => {
    const res: any = await api.post(endpoints.DELETE, { id: data });
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};


// add vote
export const addVote = async (data: any) => {
    const res: any = await api.post(endpoints.ADDVOTE, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};

// get Vote
export const getVote = async (data: any) => {
    const res: any = await api.post(endpoints.GETVOTE, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};


// get Vote
export const getFullMatch = async (data: any) => {
    const res: any = await api.post(endpoints.GETFULLMATCH, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};


// update Single
export const updateMatchSingle = async (data: any) => {
    const res: any = await api.post(endpoints.UPDATESINGLE, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};

// play game
export const playGame = async (data: any) => {
    const res: any = await api.post(endpoints.PLAYGAME, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
}


