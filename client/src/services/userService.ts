// import GetAWSConfig from '../config';
import api from './axiosService.js';

// const config = GetAWSConfig();

const userEndpoints = {
    test: "test",
    fetchSingUser: "user/get",
    socketUrl: "user/socketUrl"
}

export const fetchSingleUser = async (id: string): Promise<any> => {

    const data: any = await api.get(`${userEndpoints.fetchSingUser}/${id}`)

    if (data && Object.keys(data).length) {
        return data;
    }

    throw data;
}


export const getSocketUrl = async () => {
    const resp = await api.get(`${userEndpoints.socketUrl}/${0}`)
    return resp;
}; 