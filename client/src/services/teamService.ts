import api from './axiosService.js';


export const endpoints = {
    CREATE: "team/create",
    LIST: "team/list",
    EDIT: "team/update",
    DELETE: "team/delete"
}


export type TeamType = {
    id?: string;
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
export const listTeam = async () => {
    const res: any = await api.post(endpoints.LIST, {});
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};


// list team
export const editTeam = async (data: TeamType) => {
    const res: any = await api.post(endpoints.EDIT, data);
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};


// list team
export const deleteTeam = async (data: string) => {
    const res: any = await api.post(endpoints.DELETE, { id: data });
    if (res?.response?.status === 500) {
        throw res.response.data
    }
    return res;
};