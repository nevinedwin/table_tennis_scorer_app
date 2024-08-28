import { failure } from 'libs/response-lib/index.mjs';
import { validateAccess } from 'libs/roleValidator/roleValidator.mjs';
import { LAMBDA } from 'libs/roleValidator/lambdaPolicies.mjs';
import { MatchRepository } from './repository.mjs';
import { MatchService } from './service.mjs';


const { TABLE_NAME, INDEX_NAME } = process.env

export const main = async (event) => {

    let response = null;
    let isAuthorized = false;

    const repo = new MatchRepository(TABLE_NAME, INDEX_NAME);
    const service = new MatchService(repo);


    try {

        console.log(`Event: ${JSON.stringify(event)}`);

        const { 'custom:role': role, sub: userId } = event && event.requestContext.authorizer.claims;
        const action = event.pathParameters.action ?? 0;

        let data;

        switch (event.httpMethod) {
            case "GET":

                if (action === "get") {
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.GET)

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
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.CREATE)

                    if (isAuthorized) {
                        response = await service.create(data)
                    }

                } else if (action === "list") {
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.LIST)

                    if (isAuthorized) {
                        response = await service.list()
                    }

                } else if (action === "update") {
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.UPDATE)

                    if (isAuthorized) {
                        response = await service.editMatch(data)
                    }

                } else if (action === "delete") {
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.DELETE)

                    if (isAuthorized) {
                        response = await service.deleteMatch(data)
                    }

                } else if (action === "addVote") {
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.ADDVOTE)

                    if (isAuthorized) {
                        response = await service.addVote(data, userId)
                    }

                } else if (action === "getVote") {
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.GETVOTE)

                    if (isAuthorized) {
                        response = await service.getVote(data, userId)
                    }

                } else if (action === "getFullMatch") {
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.GETFULLMATCH)

                    if (isAuthorized) {
                        response = await service.getFullMatch(data)
                    }

                } else if (action === "playGame") {
                    isAuthorized = validateAccess(role, LAMBDA.MATCH.PLAYGAME)

                    if (isAuthorized) {
                        response = await service.playGame(data, TABLE_NAME)
                    }

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