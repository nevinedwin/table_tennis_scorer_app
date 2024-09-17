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
        return true;

    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
        return false;
    }
}

export const main = async (event, context) => {
    try {

        console.log(`Event: ${JSON.stringify(event)}`);

        const jobId = event["CodePipeline.job"].id;


        async function putJobSuccess(message) {
            const params = {
                jobId
            };
            try {
                const putJobSuccessResp = await codepipeline.putJobSuccessResult(params).promise();
                context.succeed(message);
            } catch (error) {
                console.log(`Error in success Job: ${JSON.stringify(error)}`);
                context.fail(error);
            }
        };


        async function putJobFailure(message) {
            const params = {
                jobId,
                failureDetails: {
                    message: JSON.stringify(message),
                    type: 'JobFailed',
                    externalExecutionId: context.awsRequestId
                }
            };
            try {

                const putJobFailureResp = await codepipeline.putJobFailureResult(params).promise();
                //debugger
                console.log(`putJobFailureResp: ${JSON.stringify(putJobFailureResp)}`);

                context.fail(message);
            } catch (error) {
                console.log(`Error in failure Job: ${JSON.stringify(error)}`);
                context.fail(error);
            }
        };

        response = await doFrontendDeploy();
        if (response) {
            await putJobSuccess("Frontend Deployment Successfull");
        } else {
            await putJobFailure("Frontend Deployment Failure");
        };

    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    };
};