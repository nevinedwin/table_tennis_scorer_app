import api from './axiosService.js';

const endpoints = {
    GET_USER: "auth/login/sucess"
}

export const fetchUser = async () => {
    return api.get(endpoints.GET_USER);
};