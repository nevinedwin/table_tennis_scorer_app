// import GetAWSConfig from '../config';
import api from './axiosService.js';

// const config = GetAWSConfig();

const userEndpoints = {
    test: "test",
    fetchSingUser: "user/get"
}

export const fetchSingleUser = async (id: string): Promise<any> => {
    
    try {

        const data = await api.get(`${userEndpoints.fetchSingUser}/${id}`)

        return data;

    } catch (error) {
        console.log(error);
        return error;
    }
}