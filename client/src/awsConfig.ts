import fs from 'fs';

// local
const awsVal = {
    apiGateWay: {
        NAME: "apiGateway",
        REGION: "us-east-1",
        URL: "https://ths4dgfk8b.execute-api.us-east-1.amazonaws.com/local",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_qdlvDN1x1",
        APP_CLIENT_ID: "5oe1l2fq2cm52icem7la402rfd",
        DOMAIN: "khel-test-website-local.auth.us-east-1.amazoncognito.com",
        SIGN_IN_URL: [
            "https://d35puox7evybpl.cloudfront.net/",
            "http://localhost:5173/"
        ],
        SIGN_OUT_URL: [
            "https://d35puox7evybpl.cloudfront.net/",
            "http://localhost:5173/"
        ],
    }
}

const configData = JSON.stringify(awsVal);

console.log("config writing intiated");

fs.writeFile('./public/aws-config.json', configData, 'utf-8', (err: any)=>{
    if(err){
        console.log("An Error Occured while during json object to aws config file writing");
        console.log(" ");
        console.log(" ");
    }
    
    console.log("aws-config file created");
    console.log(" ");
    console.log(" ");
})

console.log("config writing Completed");