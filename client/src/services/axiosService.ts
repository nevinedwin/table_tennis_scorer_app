import axios, { AxiosResponse } from "axios";
import GetAWSConfig from "../config.js";
import ManageLocalStorage, { localStorageKeys } from "../utilities/ManageLocalStorage.js";
import { fetchAuthSession } from "@aws-amplify/auth";
import { jwtDecode } from 'jwt-decode';


const config = GetAWSConfig();
const { token } = localStorageKeys;


interface ConfigType {
    headers: {
        "Content-Type": string;
        Authorization?: string
    }
};

class ApiService {

    private baseUrl: string;

    constructor() {
        this.baseUrl = config.apiGateWay.URL;

    };

    private async getToken() {
        try {

            let idToken = ManageLocalStorage.get(token) as string || null;

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
    };



    private async request<T>(
        method: 'get' | 'post' | 'put',
        endpoint: string,
        body?: object | null
    ): Promise<T> {
        try {

            const url = `${this.baseUrl}/${endpoint}`;
            const token = await this.getToken();
            const config: ConfigType = {
                headers: {
                    "Content-Type": "application/json",
                }
            };

            if (token) {
                config.headers.Authorization = token;
            };

            let response: AxiosResponse<T>;

            switch (method) {
                case 'get':
                    response = await axios.get<T>(url, config);
                    break;
                case 'post':
                    response = await axios.post<T>(url, body, config);
                    break;
                case 'put':
                    response = await axios.put<T>(url, body, config);
                    break;
                default:
                    throw new Error(`Unsupported Method: ${method}`);
            };

            return response.data;
        } catch (error) {
            console.log("object");
            throw error;
        };
    };


    get = <T>(endpoint: string) => this.request<T>('get', endpoint);

    post = <T>(endpoint: string, body: object | null) => this.request<T>('post', endpoint, body);

    put = <T>(endpoint: string, body: object | null) => this.request<T>('put', endpoint, body);
};



export default new ApiService();