import api from './axiosService.js';

const endpoints = {
    LOGIN: "auth/google"
}

export interface GoogleRespBodyProp {
    displayName: string | null;
    email: string | null;
    photoUrl: string | null;
};


export const googleResp = async (body: GoogleRespBodyProp) => {
    console.log("entered googleResp");
    return api.post(endpoints.LOGIN, body);
};


