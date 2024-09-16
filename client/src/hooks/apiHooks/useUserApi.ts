import ApiService from "../../services/axiosService";
import { useApiHook } from "./useApiHook"


const userEndpoints = {
    test: "test",
    fetchSingUser: "user/get",
    socketUrl: "user/socketUrl"
}

const useUserApi = () => {

    const { get } = useApiHook() as ApiService;

    const fetchSingleUser = async (id: string): Promise<any> => {
        const data: any = await get<any>(`${userEndpoints.fetchSingUser}/${id}`)
        console.log(data);
        if (data && Object.keys(data).length) {
            return data;
        }
        throw new Error("No UserData Recieved");
    };

    const getSocketUrl = async () => {
        const resp = await get(`${userEndpoints.socketUrl}/${0}`)
        return resp;
    };

    return { fetchSingleUser, getSocketUrl };
};

export default useUserApi;