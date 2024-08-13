import axios, { AxiosResponse } from "axios";
import GetAWSConfig from "../config.js";
import ManageLocalStorage, { localStorageKeys } from "../utilities/ManageLocalStorage.js";


const config = GetAWSConfig();
const { userIdKey } = localStorageKeys;


interface ConfigType {
    headers: {
        "Content-Type": string;
        Authorization?: string
    }
};

class ApiService {

    private baseUrl: string;
    private token: string;

    constructor() {
        this.baseUrl = config.apiGateWay.URL;
        this.token = (ManageLocalStorage.get(userIdKey) as any)?.token as string || "";
    };


    private async request<T>(
        method: 'get' | 'post' | 'put',
        endpoint: string,
        body?: object | null
    ): Promise<T> {
        try {

            const url = `${this.baseUrl}/${endpoint}`;
            const config: ConfigType = {
                headers: {
                    "Content-Type": "application/json",
                }
            };

            if (this.token) {
                config.headers.Authorization = `Bearer ${this.token}`;
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
            throw error;
        };
    };


    get = <T>(endpoint: string) => this.request<T>('get', endpoint);

    post = <T>(endpoint: string, body: object | null) => this.request<T>('post', endpoint, body);

    put = <T>(endpoint: string, body: object | null) => this.request<T>('put', endpoint, body);
};



export default new ApiService();