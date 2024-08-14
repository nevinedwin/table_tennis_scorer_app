
type ENVType = "prod" | "local" | "dev"

const { VITE_ENV } = import.meta.env;


const awsVal = {
    local: {
        apiGateWay: {
            NAME: "apiGateway",
            REGION: "ap-south-1",
            URL: "https://c0tysipgw1.execute-api.ap-south-1.amazonaws.com/local/api",
        },
        cognito: {
            REGION: "ap-south-1",
            USER_POOL_ID: "ap-south-1_bgs5oU1ey",
            APP_CLIENT_ID: "u1frjan09lav55q8ff82v7rvl",
            DOMAIN: "ttapp-website-local.auth.ap-south-1.amazoncognito.com",
            SIGN_IN_URL: "http://localhost:5173/",
            SIGN_OUT_URL: "http://localhost:5173/",
        }
    },
    dev: {
        apiGateWay: {
            NAME: "apiGateway",
            REGION: "ap-south-1",
            URL: "https://api-dev-dice.inapp.com",
        },
        cognito: {
            REGION: "ap-south-1",
            USER_POOL_ID: "ap-south-1_HumibfFVT",
            APP_CLIENT_ID: "3m7l1as5l4c2ulijjr0darcs95",
            IDENTITY_POOL_ID: "",
            DOMAIN: "ttapp-website-dev.auth.ap-south-1.amazoncognito.com",
            SIGN_IN_URL: "https://dev-dice.inapp.com/index.html",
            SIGN_OUT_URL: "https://dev-dice.inapp.com/index.html",
        },
    },
    prod: {
        apiGateWay: {
            NAME: "apiGateWay Production",
            REGION: "ap-south-1",
            URL: "https://api-dice.inapp.com",
        },
        cognito: {
            REGION: "ap-south-1",
            USER_POOL_ID: "ap-south-1_kj1aiCw7X",
            APP_CLIENT_ID: "7q558oguhbilfm1434tmb7noht",
            IDENTITY_POOL_ID: "",
            DOMAIN: "ttapp-website-prod.auth.ap-south-1.amazoncognito.com",
            SIGN_IN_URL: "https://dice.inapp.com/index.html",
            SIGN_OUT_URL: "https://dice.inapp.com/index.html",
        },
    },
};

const GetAWSConfig = () => {
    return awsVal[VITE_ENV as ENVType];
};

export default GetAWSConfig;
