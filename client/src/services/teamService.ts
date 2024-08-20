import api from './axiosService.js';


export const endpoints = {
    CREATE: "team/create",
    LIST: "team/list",
}


export type TeamType = {
    teamName: string;
    player1Name: string;
    player2Name: string;
    player1Email: string;
    player2Email: string;
};


// create team
export const createTeam = async (data: TeamType) => {
    const res: any = await api.post(endpoints.CREATE, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};


// list team
export const ListTeam = async () => {
    const res: any = await api.get(endpoints.LIST);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};