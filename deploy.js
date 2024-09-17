import fs from 'fs';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Load Configurations
const CONFIG_FILE = join(dirname(fileURLToPath(import.meta.url)), '.', 'deploymentConfig.json');
let config;

try {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'))
} catch (error) {
    logError(`Configuration file is not found or invalid: ${CONFIG_FILE}`, error);
    process.exit(1);
};

const { REGION, AWS_PROFILE, PIPELINE_BUCKET, BACKEND_BUCKET, FRONTEND_BUCKET, PIPELINE_STACK_NAME, BACKEND_STACK_NAME, CLOUDFRONT_DISTRIBUTION, PROJECT_NAME } = config;

// function for logging error
function logError(message, error) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}\n${error.stack}\n\n`;

    console.error(message);

    fs.appendFileSync('../deployment-errors.log', logMessage);
};

// function for exexute shell command
function execute(command, errorMessage) {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (error) {
        logError(`${errorMessage}\nCommand: ${command}`, error);
        process.exit(1);
    };
};

// Move libs to layer
function moveLibsToLayer() {
    execute('node moveLibsToLayer', 'Moving libs to layer failed');
}

// Build layer
function buildLayer() {
    execute('cd lambdaLayerStack && npm i && cd ..', 'Installing dependencies for lambda layer failed');
    moveLibsToLayer();
    execute('node createLambdaLayer', 'Creating lambda layer failed');
}

function packageBackend() {
    execute(`
        sam package --template-file ./root-template.yaml --s3-bucket ${BACKEND_BUCKET} --output-template-file packaged.yaml --region ${REGION} --profile ${AWS_PROFILE}
        `, 'packaging the backend stack failed');
};

function deployBackend() {
    buildLayer();
    packageBackend();
    execute(`
        sam deploy --template-file ./packaged.yaml --region ${REGION} --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --stack-name ${BACKEND_STACK_NAME} --s3-bucket ${BACKEND_BUCKET} --parameter-overrides FrontEndBucketName=${FRONTEND_BUCKET} --profile ${AWS_PROFILE}
        `, 'Deploying backend gets failed');
}

function deleteBackend() {
    execute(`
        aws cloudformation delete-stack --stack-name ${BACKEND_STACK_NAME} --region ${REGION} --profile ${AWS_PROFILE}
        `, 'Deleting Stack gets Failed');
}


function createInvalidations() {
    execute(`
        aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_DISTRIBUTION} --paths '/*' --profile ${AWS_PROFILE}
        `, "Invalidation for Cloudfront Failed")
}


function deployFrontend() {
    execute(`
        aws s3 sync dist/ s3://${FRONTEND_BUCKET} --profile ${AWS_PROFILE}
        `, 'Frontend Deployment Failed');
    createInvalidations();
};

function packagePipeline() {
    execute(`
        sam package --template-file ./pipeline.yaml --s3-bucket ${PIPELINE_BUCKET} --output-template-file packaged.yaml --region ${REGION} --profile ${AWS_PROFILE}
        `, 'Pipeline Packaging Failed');
}

function deployPipeline() {
    packagePipeline();
    execute(`
        sam deploy --template-file ./packaged.yaml --region ${REGION} --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --stack-name ${PIPELINE_STACK_NAME} --s3-bucket ${PIPELINE_BUCKET} --parameter-overrides PipelineBucket=${PIPELINE_BUCKET} ProjectName=${PROJECT_NAME} BackendBucket=${BACKEND_BUCKET} FrontendBucket=${FRONTEND_BUCKET} --profile ${AWS_PROFILE}
        `, 'Pipeline Deployment Failed')
}

function deletePipeline() {
    execute(`
        aws cloudformation delete-stack --stack-name ${PIPELINE_STACK_NAME} --region ${REGION} --profile ${AWS_PROFILE}
        `, 'Deleting Pipeline Failed');
}


// main execution
const command = process.argv[2];

try {

    switch (command) {
        case 'deployBackend':
            deployBackend();
            break;
        case 'deleteBackend':
            deleteBackend();
            break;
        case 'deployFrontend':
            deployFrontend();
            break;
        case 'deployPipeline':
            deployPipeline();
            break;
        case 'deletePipeline':
            deletePipeline();
            break;
        default:
            console.log('Usage: node deploy.js {deployBackend | deleteBackend | deployFrontend | deployPipeline | deletePipeline}');
            process.exit(1);
    };

} catch (error) {
    logError(`An unexpected error occured during ${command}`, error);
    process.exit(1);
};

console.log(`${command} completed successfully`);