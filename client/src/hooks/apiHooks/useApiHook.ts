import { useAmplifyContext } from "../../context/amplifyContext/amplifyContext"
import ManageLocalStorage, { localStorageKeys } from "../../utilities/ManageLocalStorage";
import { jwtDecode } from "jwt-decode";
import { fetchAuthSession } from "@aws-amplify/auth";
import axios, { AxiosRequestConfig } from "axios";

const { token } = localStorageKeys;

export const useApiHook = () => {
    const { config } = useAmplifyContext();

    const url = config?.apiGateWay?.URL || '';

    const createAxiosConfig = async (): Promise<AxiosRequestConfig> => {

        const token = await getToken();
        return {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: token })
            }
        }
    };


    const get = async (endpoint: string) => {
        try {
            const axiosConfig = await createAxiosConfig();
            const resp =  await axios.get(`${url}/${endpoint}`, axiosConfig);
            return resp?.data || resp;
        } catch (error) {
            throw error;
        };
    };

    const post = async (endpoint: string, body: object | null) => {
        try {
            
            const axiosConfig = await createAxiosConfig();
            const resp = await axios.post(`${url}/${endpoint}`, body, axiosConfig);
            return resp?.data || resp;
        } catch (error) {
            throw error;
        };
    };

    return { get, post };
};


async function getToken() {
    try {

        let idToken = ManageLocalStorage.get(token) as string || null;;

        // check the token expiry
        if (idToken) {
            const decodedToken = jwtDecode(idToken);
            const currentTime = Date.now()
            if (decodedToken.exp && decodedToken.exp < currentTime) {
                idToken = null;
            };
        };

        if (!idToken) {
            const session = await fetchAuthSession()
            idToken = session?.tokens?.idToken?.toString() || "";
            ManageLocalStorage.set(token, idToken);
        };

        return idToken;

    } catch (error) {
        return null;
    }; 
}