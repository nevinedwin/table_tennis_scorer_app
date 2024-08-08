import api from './axiosService.js';

const endpoints = {
    LOGIN: "auth/google",
    FETCH_USER: "user"
}

export interface GoogleRespBodyProp {
    displayName: string | null;
    email: string | null;
    photoUrl: string | null;
};


export const googleResp = async (body: GoogleRespBodyProp) => {
    return api.post(endpoints.LOGIN, body);
};


export const fetchUser = async (id?: string) => {
    if(id){
        return api.get(`${endpoints.FETCH_USER}/${id}`)
    }
}; 


