import axios, { AxiosResponse } from "axios";
import { getConfig } from "../config.js";


const config = getConfig();

class ApiService {

    private baseUrl: string;

    constructor() {
        this.baseUrl = config.baseUrl;
    };


    private async request<T>(
        method: 'get' | 'post' | 'put',
        endpoint: string,
        body?: object | null
    ): Promise<T> {
        try {

            const url = `${this.baseUrl}/${endpoint}`;
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
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
            if (axios.isAxiosError(error)) {
                throw new Error(`Api Request failed: ${error?.message}`);
            };

            throw error;
        };
    };


    get = <T>(endpoint: string) => this.request<T>('get', endpoint);

    post = <T>(endpoint: string, body: object | null) => this.request<T>('post', endpoint, body);

    put = <T>(endpoint: string, body: object | null) => this.request<T>('put', endpoint, body);
};



export default new ApiService();