// local
const awsVal = {
    apiGateWay: {
        NAME: "apiGateway",
        REGION: "ap-south-1",
        URL: "https://wyxggpvbc0.execute-api.ap-south-1.amazonaws.com/local",
    },
    cognito: {
        REGION: "ap-south-1",
        USER_POOL_ID: "ap-south-1_Im83sKXVi",
        APP_CLIENT_ID: "3f3tshts6paoieaed7u18na394",
        DOMAIN: "khelapp-website-local.auth.ap-south-1.amazoncognito.com",
        SIGN_IN_URL: [
            "https://d3g7vu7m4wr9up.cloudfront.net/index.html",
            "http://localhost:5173/"
        ],
        SIGN_OUT_URL: [
            "https://d3g7vu7m4wr9up.cloudfront.net/index.html",
            "http://localhost:5173/"
        ],
    }
}

const GetAWSConfig = () => {
    return awsVal;
};

export default GetAWSConfig;
