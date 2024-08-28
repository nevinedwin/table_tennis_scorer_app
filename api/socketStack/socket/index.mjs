import { post } from 'libs/db-lib/index.mjs';
import { failure, success } from "libs/response-lib/index.mjs";

const { TABLE_NAME } = process.env;


const updateUserConnection = async (authorizer, routeKey, connectionId = "") => {

    try {


        const { id } = authorizer;

        const mod = Date.now();

        // "connectionIds" key for connection Id 
        const createParams = {
            TableName: TABLE_NAME,
            Item: {
                id,
                details: "connection",
                mdt: mod,
                role: "SOCKET",
                connectionId: routeKey === "connect" ? connectionId : "",
            }
        };

        // debugger
        console.log(`createParams: ${JSON.stringify(createParams)}`);

        const [err, updateResp] = await post(createParams);

        if (err) throw err;

        // debugger
        console.log(`updateResp: ${JSON.stringify(updateResp)}`);

        return success({
            type: routeKey,
            data: routeKey === "connect" ? "Connection Established" : "Connection Stopped"
        });

    } catch (error) {

        console.log(`Error: ${JSON.stringify(error)}`);
        console.log(error);
        return failure({
            type: "error",
            data: `Error in Connecting/Disconnecting Web Socket, :${JSON.stringify(error)}`
        });
    };
};


export async function main(event) {
    //debugger
    console.log(`event: ${JSON.stringify(event)}`);
    let response = {
        type: "success",
        data: "successfully connected and added connectionId to DB",
    };

    try {
        if (event.requestContext) {
            const { connectionId, routeKey, authorizer } = event.requestContext;
            switch (routeKey) {
                case "$connect":
                    response = await updateUserConnection(authorizer, "connect", connectionId);
                    break;
                case "$disconnect":
                    response = await updateUserConnection(authorizer, "disconnect");
                    break;
                case "$default":
                    response = success({
                        type: "$default",
                        data: "No actions matched your request",
                    });
                    break;
                default:
                    response = failure({
                        type: "error",
                        data: "Invalid routeKey provided"
                    })
                    break;
            }
        }

    } catch (error) {
        console.log(`error at main`);
        console.log(error);
        response = failure({
            type: "error",
            data: error.message,
        });
    }
    return response;
}