
export type  AmplifyConfigType = {
    apiGateWay: {
        NAME: string;
        REGION: string;
        URL: string;
    },
    cognito: {
        REGION: string;
        USER_POOL_ID: string;
        APP_CLIENT_ID: string;
        DOMAIN: string;
        SIGN_IN_URL: string[],
        SIGN_OUT_URL: string[],
    }
};
