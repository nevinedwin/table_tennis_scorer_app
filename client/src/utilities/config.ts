
const { VITE_ENV, VITE_CLIENT_SECRET, VITE_CLIENT_ID } = import.meta.env;


type ConfigDataType = {
    dev: {
        BASE_URL: string;
        CLIENT_ID: string;
        CLIENT_SECERET: string;
    },
    prod: {
        BASE_URL: string;
        CLIENT_ID: string;
        CLIENT_SECERET: string;
    }
}

const configData: ConfigDataType = {
    dev: {
        BASE_URL: `http://localhost:8081/api/v1`,
        CLIENT_ID: VITE_CLIENT_ID,
        CLIENT_SECERET: VITE_CLIENT_SECRET,
    },
    prod: {
        BASE_URL: `https://localhost:8081/api`,
        CLIENT_ID: "",
        CLIENT_SECERET: ""
    }
}



export const getConfig = (): ConfigDataType[keyof ConfigDataType] => {
    const env = VITE_ENV as keyof ConfigDataType;
    return configData[env] || configData.dev;
}