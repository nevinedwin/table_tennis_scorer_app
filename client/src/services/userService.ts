import api from './axiosService.js';

const endpoints = {
    FETCH_USER: "auth/user"
}


export const fetchUser = async (id?: string) => {
    if(id){
        return api.get(`${endpoints.FETCH_USER}/${id}`)
    }
}; 


