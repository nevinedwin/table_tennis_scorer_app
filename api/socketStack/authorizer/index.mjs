import { CognitoJwtVerifier } from "aws-jwt-verify";

const { USERPOOL_ID, USERPOOL_CLIENT_ID } = process.env;

const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: USERPOOL_ID,
    tokenUse: "id",
    clientId: USERPOOL_CLIENT_ID
});


let payload;

const generatePolicy = function (principalId, effect, resource, context) {
    const authResponse = {
        principalId: principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
        context: context,
    };
    console.log(`authResponse: ${JSON.stringify(authResponse)}`);
    return authResponse;
};

export async function main(event) {

    try {

        //debugger
        console.log(`event: ${JSON.stringify(event)}`);

        const { token } = event.queryStringParameters;

        if (!token) throw new Error("UnAuthorized");

        //debugger
        console.log(`before verifier:`);

        payload = await jwtVerifier.verify(token);

        //debugger
        console.log(`After Verifier`);

        const context = {
            id: payload.sub,
        };

        return generatePolicy(payload.sub, "Allow", event.methodArn, context);

    } catch (error) {
        console.log('In authorizer error block', JSON.stringify(error));
        throw new Error("Unauthorized");
    }

}