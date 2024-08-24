import { failure } from 'libs/response-lib/index.mjs';
import { validateAccess } from 'libs/roleValidator/roleValidator.mjs';
import { LAMBDA } from 'libs/roleValidator/lambdaPolicies.mjs';
import { TeamRepository } from './repository.mjs';
import { TeamService } from './service.mjs';


const { TABLE_NAME, INDEX_NAME } = process.env

export const main = async (event) => {

    let response = null;
    let isAuthorized = false;

    const repo = new TeamRepository(TABLE_NAME, INDEX_NAME);
    const service = new TeamService(repo);


    try {

        console.log(`Event: ${JSON.stringify(event)}`);

        const { 'custom:role': role, sub: userId } = event && event.requestContext.authorizer.claims;
        const action = event.pathParameters.action ?? 0;

        let data;

        switch (event.httpMethod) {
            case "GET":

                if (action === "get") {
                    isAuthorized = validateAccess(role, LAMBDA.TEAM.GET)

                    if (isAuthorized) {
                        response = await service.get(event)
                    }
                } else {
                    response = failure("Invalid Endpoint");
                };
                break;

            case "POST":

                data = event.body ? JSON.parse(event.body) : null;

                if (!data) {
                    response = failure("Body is Empty");

                } else if (action === "create") {

                    isAuthorized = validateAccess(role, LAMBDA.TEAM.CREATE);

                    if (isAuthorized) {
                        response = await service.create(data, userId);
                    };
                } else if (action === "list") {

                    isAuthorized = validateAccess(role, LAMBDA.TEAM.LIST);

                    if (isAuthorized) {

                        response = await service.list(data);
                    };

                } else if (action === "update") {

                    isAuthorized = validateAccess(role, LAMBDA.TEAM.UPDATE);

                    if (isAuthorized) {

                        response = await service.update(data);
                    };

                } else if (action === "delete") {

                    isAuthorized = validateAccess(role, LAMBDA.TEAM.DELETE);

                    if (isAuthorized) {

                        response = await service.delete(data);
                    };

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