import * as dotenv from 'dotenv';
dotenv.config();


const { ENV, CLIENT_ID, CLIENT_SECRET } = process.env;

type ConfigDataType = {
    dev: {
        JWT_SECRET: string;
    }
}

const config: ConfigDataType = {
    dev: {
        JWT_SECRET: process.env.JWT_SECRET as string
    }
};


export const getConfig = (): ConfigDataType[keyof ConfigDataType] => {
    const env = ENV as keyof ConfigDataType;
    return config[env];
};