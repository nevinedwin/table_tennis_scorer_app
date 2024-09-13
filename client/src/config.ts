// debug
const awsVal = {
    apiGateWay: {
        NAME: "apiGateway",
        REGION: "ap-south-1",
        URL: "https://api-khel.ns-info.xyz/debug",
    },
    cognito: {
        REGION: "ap-south-1",
        USER_POOL_ID: "ap-south-1_BEYEfBa7Z",
        APP_CLIENT_ID: "53p555ctgca8uomqst3dgk89bj",
        DOMAIN: "khelapp-website-debug.auth.ap-south-1.amazoncognito.com",
        SIGN_IN_URL: ["https://khel.ns-info.xyz/"],
        SIGN_OUT_URL: ["https://khel.ns-info.xyz/"],
    }
}

const GetAWSConfig = () => {
    return awsVal;
};

export default GetAWSConfig;
