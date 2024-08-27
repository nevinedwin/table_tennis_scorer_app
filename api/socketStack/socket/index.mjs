import { put } from 'libs/db-lib/index.mjs'

const { TABLE_NAME } = process.env;


const updateUserConnection = async (authorizer, routeKey, connectionId = "") => {

    try {


        const { sub } = authorizer;

        const mod = Date.now();

        // "connectionIds" key for connection Id 
        const updateParams = {
            TableName: TABLE_NAME,
            Key: {
                id: sub,
                details: `connection`,
            },
            UpdateExpression:
                "set #connectionId = :connectionId,  #mdt = :modDate, #role = :role",
            ExpressionAttributeNames: {
                "#connectionId": "connectionId",
                "#mdt": "mdt",
                "#role": "role"
            },
            ExpressionAttributeValues: {
                ":connectionId": routeKey === "connect" ? connectionId : "",
                ":modDate": mod,
                ":role": "SOCKET"
            },
        };

        // debugger
        console.log(`UpdateParams: ${JSON.stringify(updateParams)}`);

        const [err, updateResp] = await put(updateParams);

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