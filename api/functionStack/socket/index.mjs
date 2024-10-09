import AWS from 'aws-sdk';

import { failure, success } from "libs/response-lib/index.mjs";
import { get, query } from 'libs/db-lib/index.mjs';

const { WEBSOCKET_POST_URL, TABLE_NAME, INDEX_NAME } = process.env;

async function sendNotification({ notificationType, payload = "", connectionId }) {
    //debugger
    console.log(`Entered notificaiton Fucntion:`);
    try {
        const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            endpoint: WEBSOCKET_POST_URL
        });

        const postBody = {
            ConnectionId: connectionId,
            Data: Buffer.from(JSON.stringify({ type: notificationType, payload }))
        };

        //debugger
        console.log(`postBody: ${JSON.stringify(postBody)}`);

        const sendResp = await apigwManagementApi.postToConnection(postBody).promise();

        //debugger
        console.log(`sendResponse: ${JSON.stringify(sendResp)}`);

    } catch (error) {
        //debugger
        console.log(`Error in sending notification to Connection ID ${connectionId}: ${error.message}, Stack: ${error.stack}, Full Error: ${JSON.stringify(error)}`);
    };
};


const parseRecordObj = (event) => {
    let dynamoRecord;
    let dynamoRecordOldImage;

    dynamoRecord =
        event.Records &&
            event.Records.length &&
            event.Records[0].dynamodb &&
            event.Records[0].dynamodb.NewImage
            ? event.Records[0].dynamodb.NewImage
            : {};
    dynamoRecordOldImage =
        event.Records &&
            event.Records.length &&
            event.Records[0].dynamodb &&
            event.Records[0].dynamodb.OldImage
            ? event.Records[0].dynamodb.OldImage
            : {};
    const recordsConverted = AWS.DynamoDB.Converter.unmarshall(dynamoRecord);

    //debugger
    console.log(`recordsConverted: ${JSON.stringify(recordsConverted)}`);
    const recordsConvertedOld = AWS.DynamoDB.Converter.unmarshall(dynamoRecordOldImage);

    //debugger
    console.log(`recordsConvertedOld: ${JSON.stringify(recordsConvertedOld)}`);
    return { recordsConverted, recordsConvertedOld };
};

async function fetchTeam(id) {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id,
                details: "details"
            }
        };

        // debugger
        console.log(`fetch params: ${JSON.stringify(params)}`);

        const [err, succ] = await get(params);

        if (err || !succ) throw err;

        return [null, succ];
    } catch (error) {
        return [error, null];
    };
};

async function getMatchSet(matchId, setNumber) {
    try {
        const params = {
            TableName: TABLE_NAME,
            Key: {
                id: matchId,
                details: `set#${setNumber}`
            }
        };

        const [err, resp] = await get(params);
        if (err) throw err;

        return [null, resp];
    } catch (error) {
        return [error, null];
    };
};


async function getAllConnectionIds() {
    try {

        const params = {
            TableName: TABLE_NAME,
            IndexName: INDEX_NAME,
            KeyConditionExpression: `#role = :role`,
            ExpressionAttributeNames: {
                "#role": "role"
            },
            ExpressionAttributeValues: {
                ":role": "SOCKET"
            }
        };

        //debugger
        console.log(`params: ${JSON.stringify(params)}`);

        const [err, succ] = await query(params);

        if (err) throw err;

        return [null, succ];

    } catch (error) {
        return [error, null];
    };
}


export async function main(event) {
    try {

        //debugger
        console.log(`Event: ${JSON.stringify(event)}`);

        const eventType =
            event && event.Records && event.Records.length && event.Records[0].eventName
                ? event.Records[0].eventName
                : "";

        if (eventType === "INSERT" || eventType === "MODIFY") {
            const { recordsConverted: newImg, recordsConvertedOld: oldImg } = parseRecordObj(event);

            //debugger
            console.log(`newImg: ${JSON.stringify(newImg)}`);
            console.log(`oldImg: ${JSON.stringify(oldImg)}`);

            if (newImg?.role === "MATCH") {
                if (newImg?.matchStatus === "LIVE" || newImg?.matchStatus === "FINISHED") {

                    const match = newImg;

                    // get1Team data
                    const [team1Err, team1] = await fetchTeam(match.team1Id);

                    if (team1Err) throw team1Err;

                    const team1Data = team1?.Item || {};

                    // get2Team data
                    const [team2Err, team2] = await fetchTeam(match.team2Id);

                    if (team2Err) throw team2Err;

                    const team2Data = team2?.Item || {};

                    // get match set data
                    const [matchSet1Err, matchSet1Data] = await getMatchSet(match.id, 1);

                    if (matchSet1Err) throw matchSet1Err;

                    const [matchSet2Err, matchSet2Data] = await getMatchSet(match.id, 2);

                    if (matchSet2Err) throw matchSet2Err;

                    const [matchSet3Err, matchSet3Data] = await getMatchSet(match.id, 3);

                    if (matchSet3Err) throw matchSet3Err;

                    const matchSet = {
                        1: matchSet1Data.Item || {},
                        2: matchSet2Data.Item || {},
                        3: matchSet3Data.Item || {},
                    };

                    const returnData = {
                        matchId: match?.id || null,
                        matchNumber: match?.matchNumber || null,
                        date: match?.date || null,
                        team1Id: match?.team1Id || null,
                        team1Name: team1Data?.teamName || null,
                        team1Player1Name: team1Data?.player1Name || null,
                        team1Player2Name: team1Data?.player2Name || null,
                        team1Set1Score: matchSet["1"]?.team1Score || 0,
                        team1Set2Score: matchSet["2"]?.team1Score || 0,
                        team1Set3Score: matchSet["3"]?.team1Score || 0,
                        team1SetScore: match?.team1SetScore || 0,
                        team1Voting: match?.team1Voting || 0,
                        team2Id: match?.team2Id || null,
                        team2Name: team2Data?.teamName || null,
                        team2Player1Name: team2Data?.player1Name || null,
                        team2Player2Name: team2Data?.player2Name || null,
                        team2Set1Score: matchSet["1"]?.team2Score || 0,
                        team2Set2Score: matchSet["2"]?.team2Score || 0,
                        team2Set3Score: matchSet["3"]?.team2Score || 0,
                        team2SetScore: match?.team2SetScore || 0,
                        team2Voting: match?.team2Voting || 0,
                        votingStarted: match?.votingStarted || false,
                        totalVoting: match.totalVoting || 0,
                        matchResult: match?.matchResult || null,
                        matchStatus: match?.matchStatus || null,
                        undoHistory: match?.undoHistory || null,
                        winner: match?.winner || null,
                        currentSet: match?.currentSet || null,
                        set1Winner: matchSet["1"]?.winner || null,
                        set2Winner: matchSet["2"]?.winner || null,
                        set3Winner: matchSet["3"]?.winner || null,
                        team1Point: team1Data?.point || 0,
                        team2Point: team2Data?.point || 0,
                        team1MatchPlayed: team1Data?.matchPlayed || 0,
                        team1MatchWon: team1Data?.matchWon || 0,
                        team1MatchLose: team1Data?.matchLose || 0,
                        team2MatchPlayed: team2Data?.matchPlayed || 0,
                        team2MatchWon: team2Data?.matchWon || 0,
                        team2MatchLose: team2Data?.matchLose || 0
                    };


                    //debugger
                    console.log(`returnData: ${JSON.stringify(returnData)}`);

                    // get all connetion Ids
                    const [getErr, connectionIds] = await getAllConnectionIds();

                    if (getErr) throw getErr;

                    //debugger
                    console.log(`connectionIds: ${JSON.stringify(connectionIds)}`);


                    const notificationSendPromises = [];
                    if (Array.isArray(connectionIds?.Items)) {
                        for (const eachId of connectionIds.Items) {
                            const message = {
                                action: "LIVE_MATCH",
                                data: returnData
                            }

                            if (eachId?.connectionId) {
                                notificationSendPromises.push(sendNotification({
                                    connectionId: eachId.connectionId,
                                    notificationType: "LIVE",
                                    payload: message
                                }));
                            };
                        };
                    };

                    //debugger
                    console.log(`notificationSendPromises: ${JSON.stringify(notificationSendPromises)}`);

                    if (notificationSendPromises.length) {

                        const result = await Promise.allSettled(notificationSendPromises);

                        result.forEach(eachResult => {
                            if (eachResult.status === "rejected") {
                                const { error, connectionId } = result.reason;
                                console.log(`Failed to send notification to ${connectionId}: ${error.message}`);
                            } else {
                                console.log(`Notification sent successfully to ${result.value.connectionId}`);
                            };
                        })
                    };
                };
            };
        };


        return success("Successful")

    } catch (error) {
        //debugger
        console.log(`Error: ${error.message}, Stack: ${error.stack}, Full Error: ${JSON.stringify(error)}`);
        return failure(error);
    }
}