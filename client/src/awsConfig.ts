import fs from 'fs';

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