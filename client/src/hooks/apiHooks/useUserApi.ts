import { UserRole } from "../../context/authContext/authContextTypes";
import { useApiHook } from "./useApiHook"

type ChangeRoleType = {
    userId: string,
    userName: String,
    role: UserRole
}

const userEndpoints = {
    test: "test",
    fetchSingUser: "user/get",
    socketUrl: "user/socketUrl",
    changeRole: "user/changeRole",
    listUser: "user/listUser"
}

const useUserApi = () => {

    const { get, post } = useApiHook();

    const fetchSingleUser = async (id: string): Promise<any> => {
        const data: any = await get(`${userEndpoints.fetchSingUser}/${id}`)
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

    const changeRole = async (data: ChangeRoleType) => {
        const resp = await post(`${userEndpoints.changeRole}`, data);
        return resp;
    }

    const listUsers = async (data: any) => {
        const resp = await post(`${userEndpoints.listUser}`, data);
        return resp;
    }

    return { fetchSingleUser, getSocketUrl, changeRole, listUsers };
};

export default useUserApi;