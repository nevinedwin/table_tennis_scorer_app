import * as dotenv from 'dotenv';
dotenv.config();


const { ENV, CLIENT_ID, CLIENT_SECRET } = process.env;

type ConfigDataType = {
    dev: {
        CLIENT_ID: string;
        CLIENT_SECERET: string;
        SUCCESS_REDIRECT_URL: string;
        FAILURE_REDIRECT_URL: string;
        CALLBACK_URL: string;
        JWT_SECRET: string;
    }
}

const config: ConfigDataType = {
    dev: {
        CLIENT_ID: CLIENT_ID as string,
        CLIENT_SECERET: CLIENT_SECRET as string,
        SUCCESS_REDIRECT_URL: "http://localhost:5173/dashboard",
        FAILURE_REDIRECT_URL: "http://localhost:5173/login",
        CALLBACK_URL: "/api/v1/auth/google/callback",
        JWT_SECRET: "123456"
    }
}


export const getConfig = (): ConfigDataType[keyof ConfigDataType] => {
    const env = ENV as keyof ConfigDataType;
    return config[env];
};