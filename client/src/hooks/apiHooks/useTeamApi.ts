import { useApiHook } from "./useApiHook"



export const endpoints = {
    CREATE: "team/create",
    LIST: "team/list",
    EDIT: "team/update",
    DELETE: "team/delete",
    GET: "team/get"
}


export type TeamType = {
    id?: string;
    teamName: string;
    player1Name: string;
    player2Name: string;
    player1Email: string;
    player2Email: string;
    point?: number;
    matchPlayed?: number;
    matchWon?: number;
    matchLose?: number;
    pool?: string;
};

const useTeamApi = () => {

    const { get, post } = useApiHook();


    // create team
    const createTeam = async (data: TeamType) => {
        const res: any = await post(endpoints.CREATE, data);
        if (res?.response?.status === 500) {
            throw res.response.data
        }
        return res;
    };


    // list team
    const listTeam = async () => {
        const res: any = await post(endpoints.LIST, {});
        if (res?.response?.status === 500) {
            throw res.response.data
        }
        return res;
    };


    // list team
    const editTeam = async (data: TeamType) => {
        const res: any = await post(endpoints.EDIT, data);
        if (res?.response?.status === 500) {
            throw res.response.data
        }
        return res;
    };


    // list team
    const deleteTeam = async (data: string) => {
        const res: any = await post(endpoints.DELETE, { id: data });
        if (res?.response?.status === 500) {
            throw res.response.data
        }
        return res;
    };

    // get team
    const getTeam = async (data: string) => {
        const res: any = await get(`${endpoints.GET}/${data}`);
        if (res?.response?.status === 500) {
            throw res.response.data
        }
        return res;
    };

    return {
        createTeam,
        listTeam,
        editTeam,
        deleteTeam,
        getTeam
    };
};

export default useTeamApi;