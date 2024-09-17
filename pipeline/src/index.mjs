import AWS from 'aws-sdk';
const cloudformation = new AWS.CloudFormation()
const s3 = new AWS.S3();
const cloudfront = new AWS.CloudFront();
const codepipeline = new AWS.CodePipeline();

let response;

const { PROJECT_NAME, REGION } = process.env;

async function doFrontendDeploy() {
    const params = {
        StackName: PROJECT_NAME
    };

    try {

        // frontend configurtations
        const frontendConfigObj = {
            apiGateWay: {
                NAME: PROJECT_NAME,
                REGION: REGION,
                URL: "",
            },
            cognito: {
                REGION: REGION,
                USER_POOL_ID: "",
                APP_CLIENT_ID: "",
                DOMAIN: "",
                SIGN_IN_URL: [],
                SIGN_OUT_URL: []
            }
        };

        const describeStackResp = await cloudformation.describeStacks(params).promise();

        // debugger
        console.log(`describeStackResp: ${JSON.stringify(describeStackResp)}`);

        const stackOutputs = describeStackResp?.Stacks?.[0]?.Outputs ?? [];

        //debugger
        console.log(`stackOutputs: ${JSON.stringify(stackOutputs)}`);

    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
        return false;
    }
}

export const main = async (event) => {
    try {

        console.log(`Event: ${JSON.stringify(event)}`);

        const jobId = event["CodePipeline.job"].id;

        response = await doFrontendDeploy();

    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    };
};