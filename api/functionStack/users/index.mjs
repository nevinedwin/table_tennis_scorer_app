import { validateAccess } from "libs/roleValidator/roleValidator";
import { UserRepository } from "./repository";
import { UserService } from "./service";
import { LAMBDA } from "libs/roleValidator/lambdaPolicies";

const { failure, unAuthorized } = require("libs/response-lib");


const { TABLE_NAME, INDEX_NAME } = process.env;

export const main = async (event) => {


    const repo = new UserRepository(TABLE_NAME, INDEX_NAME);
    const service = new UserService(repo);

    let [response, isAuthorized] = [{}, false];

    try {

        console.log(`Event: ${JSON.stringify(event)}`);


        const { 'custom:role': role, sub: userId } = event && event.requestContext.authorizer.claims;
        const action = event.pathParameters.action ?? 0;

        console.log(object);

        let data;

        switch (event.httpMethod) {

            case 'GET':
                break;

            case 'POST':

                data = JSON.parse(event.body);

                if (!data) {

                    return failure("Body is Empty")
                }
                else if (action === "get") {
                    isAuthorized = validateAccess(role, LAMBDA.USERS.GET_USER)
                } else {

                    response = failure("Invalid Endpoint");
                };
        };

        if (!isAuthorized) {

            response = unAuthorized({ status: false, error: "User is not Authorized to perform this Action" });
        };


    } catch (error) {
        console.log(`error: ${JSON.stringify(error)}`);

        response = failure(error)

    };

    return response;
} 