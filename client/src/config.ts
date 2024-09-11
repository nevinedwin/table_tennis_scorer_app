// local
const awsVal = {
    apiGateWay: {
        NAME: "apiGateway",
        REGION: "ap-south-1",
        URL: "https://g33b3lopr3.execute-api.ap-south-1.amazonaws.com/local",
    },
    cognito: {
        REGION: "ap-south-1",
        USER_POOL_ID: "<USERPOOL_ID>",
        APP_CLIENT_ID: "<USERPOOLCLIENT_ID>",
        DOMAIN: "<DOMAIN_NAME>",
        SIGN_IN_URL: ["<SIGNIN_URL>"],
        SIGN_OUT_URL: ["<SIGNOUT_URL>"],
    }
}

const GetAWSConfig = () => {
    return awsVal;
};

export default GetAWSConfig;
