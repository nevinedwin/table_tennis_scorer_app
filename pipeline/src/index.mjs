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

        let cloudFrontDistributionId, frontendBucket

        for (let stackOutput of stackOutputs) {
            switch (stackOutput.OutputKey) {
                case "UserPoolClientId":
                    frontendConfigObj.cognito.APP_CLIENT_ID = stackOutput.OutputValue;
                    break;
                case "UserPoolId":
                    frontendConfigObj.cognito.USER_POOL_ID = stackOutput.OutputValue;
                    break;
                case "DomainName":
                    frontendConfigObj.cognito.DOMAIN = stackOutput.OutputValue;
                    break;
                case "CloudFrontDistributionId":
                    cloudFrontDistributionId = stackOutput.OutputValue;
                    break;
                case "KhelAppApiURL":
                    frontendConfigObj.apiGateWay.URL = stackOutput.OutputValue;
                    break;
                case "SignInUrl":
                    frontendConfigObj.cognito.SIGN_IN_URL.push(stackOutput.OutputValue);
                    frontendConfigObj.cognito.SIGN_OUT_URL.push(stackOutput.OutputValue);
                    break;
                case "FrontendBucket":
                    frontendBucket = stackOutput.OutputValue;
                    break;
                default:
                    break;
            }
        };

        //debugger
        console.log(`frontendConfigObj: ${JSON.stringify(frontendConfigObj)}`);


        // upload the frontend config to s3
        const fileName = "aws-config.json";
        const uploadS3Params = {
            Bucket: frontendBucket,
            Key: fileName,
            ContentType: "application/json",
            Body: JSON.stringify(frontendConfigObj)
        };

        //debugger
        console.log(`uploadS3Params: ${JSON.stringify(uploadS3Params)}`);

        const s3UploadResp = await s3.upload(uploadS3Params).promise();

        //debugger
        console.log(`s3UploadResp: ${JSON.stringify(s3UploadResp)}`);

        // create invalidation for the cloudfront
        const timestamp = new Date().toISOString();
        const createInvalidationParams = {
            DistributionId: cloudFrontDistributionId,
            InvalidationBatch: {
                CallerReference: timestamp,
                Paths: {
                    Quantity: 1,
                    Items: ["/*"]
                }
            }
        };

        //debugger
        console.log(`createInvalidationParams: ${JSON.stringify(createInvalidationParams)}`);

        const createInvalidationResp = await cloudfront.createInvalidation(createInvalidationParams).promise();

        //debugger
        console.log(`createInvalidationResp: ${JSON.stringify(createInvalidationResp)}`);

        return true;

    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
        return false;
    }
}


// Main Function
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