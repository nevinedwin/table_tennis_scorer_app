
type ENVType = "prod" | "local" | "dev" | "debug"

const { VITE_ENV } = import.meta.env;


const awsVal = {
    local: {
        apiGateWay: {
            NAME: "apiGateway",
            REGION: "ap-south-1",
            URL: "https://gzjh5p6fk9.execute-api.ap-south-1.amazonaws.com/local",
        },
        cognito: {
            REGION: "ap-south-1",
            USER_POOL_ID: "ap-south-1_6Z2RYSDak",
            APP_CLIENT_ID: "2mis557ujhaas99769q5v9acf",
            DOMAIN: "ttapp-website-local.auth.ap-south-1.amazoncognito.com",
            SIGN_IN_URL: [
                "http://localhost:5173/",
                "https://dwdwwt4h4m5x8.cloudfront.net/index.html"
            ],
            SIGN_OUT_URL: [
                "http://localhost:5173/",
                "https://dwdwwt4h4m5x8.cloudfront.net/index.html"
            ],
        }
    },
    debug: {
        apiGateWay: {
            NAME: "apiGateway",
            REGION: "ap-south-1",
            URL: "https://api-khel.ns-info.xyz",
        },
        cognito: {
            REGION: "ap-south-1",
            USER_POOL_ID: "ap-south-1_HumibfFVT",
            APP_CLIENT_ID: "3m7l1as5l4c2ulijjr0darcs95",
            IDENTITY_POOL_ID: "",
            DOMAIN: "ttapp-website-dev.auth.ap-south-1.amazoncognito.com",
            SIGN_IN_URL: [" https://api-khel.ns-info.xyz/index.html"],
            SIGN_OUT_URL: [" https://api-khel.ns-info.xyz/index.html"],
        },
    },
    dev: {
        apiGateWay: {
            NAME: "apiGateway",
            REGION: "ap-south-1",
            URL: "https://api-dev-khel.inapp.com",
        },
        cognito: {
            REGION: "ap-south-1",
            USER_POOL_ID: "ap-south-1_HumibfFVT",
            APP_CLIENT_ID: "3m7l1as5l4c2ulijjr0darcs95",
            IDENTITY_POOL_ID: "",
            DOMAIN: "ttapp-website-dev.auth.ap-south-1.amazoncognito.com",
            SIGN_IN_URL: [" https://dev-khel.inapp.com/index.html"],
            SIGN_OUT_URL: [" https://dev-khel.inapp.com/index.html"],
        },
    },
    prod: {
        apiGateWay: {
            NAME: "apiGateWay Production",
            REGION: "ap-south-1",
            URL: "https://api-khel.inapp.com",
        },
        cognito: {
            REGION: "ap-south-1",
            USER_POOL_ID: "ap-south-1_kj1aiCw7X",
            APP_CLIENT_ID: "7q558oguhbilfm1434tmb7noht",
            IDENTITY_POOL_ID: "",
            DOMAIN: "ttapp-website-prod.auth.ap-south-1.amazoncognito.com",
            SIGN_IN_URL: ["https://khel.inapp.com/index.html"],
            SIGN_OUT_URL: ["https://khel.inapp.com/index.html"],
        },
    },
};

const GetAWSConfig = () => {
    return awsVal[VITE_ENV as ENVType];
};

export default GetAWSConfig;
