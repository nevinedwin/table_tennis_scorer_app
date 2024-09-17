import fs from 'fs';

// local
const awsVal = {
    apiGateWay: {
        NAME: "apiGateway",
        REGION: "us-east-1",
        URL: "https://wyxggpvbc0.execute-api.us-west-2.amazonaws.com/local",
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_Im83sKXVi",
        APP_CLIENT_ID: "3f3tshts6paoieaed7u18na394",
        DOMAIN: "khel-test-website-local.auth.us-west-2.amazoncognito.com",
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