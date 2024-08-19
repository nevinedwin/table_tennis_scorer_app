import { failure, success } from 'libs/response-lib/index.mjs';
import { validateAccess } from 'libs/roleValidator/roleValidator.mjs';
import { LAMBDA } from 'libs/roleValidator/lambdaPolicies.mjs';
import { UserService } from './service.mjs';
import { UserRepository } from './repository.mjs';


const { TABLE_NAME, INDEX_NAME } = process.env

export const main = async (event) => {

    let response = null;
    let isAuthorized = false;

    const repo = new UserRepository(TABLE_NAME, INDEX_NAME);
    const service = new UserService(repo);


    try {

        console.log(`Event: ${JSON.stringify(event)}`);

        const { 'custom:role': role, sub: userId } = event && event.requestContext.authorizer.claims;
        const action = event.pathParameters.action ?? 0;

        let data;

        switch (event.httpMethod) {
            case "GET":

                if (action === "get") {

                    isAuthorized = validateAccess(role, LAMBDA.USERS.GET_USER);

                    if (isAuthorized) {
                        response = await service.getUser(event);
                    };

                } else {
                    response = failure("Invalid Endpoint");
                };
                break;

            case "POST":

                data = event.body ? JSON.parse(event.body) : null;

                if (!data) {
                    response = failure("Body is Empty");
                } else {
                    response = failure("Invalid Endpoint");
                };
                break;
            default:
                response = failure("invalid httpMethod");
        };

        if (!response && !isAuthorized) {
            response = failure("UnAuthorized to perform this api call");
        };

    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
        response = failure(error);
    };

    return response;
} 