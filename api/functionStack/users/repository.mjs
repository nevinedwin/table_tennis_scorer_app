import AWS from "aws-sdk";
import { get, put, query } from 'libs/db-lib/index.mjs'

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();


export class UserRepository {

    constructor(tableName, indexName, userPoolId) {
        this.tableName = tableName;
        this.indexName = indexName;
        this.userPoolId = userPoolId;
    };


    async fetchUser(id) {
        try {

            const params = {
                TableName: this.tableName,
                Key: {
                    id: `USER#${id}`,
                    details: "details"
                }
            };

            // debugger
            console.log(`fetch params: ${JSON.stringify(params)}`);

            const [err, succ] = await get(params);


            if (err || !succ) throw err;

            const { Item } = succ;

            const userData = {
                teamId: Item.teamId,
                role: Item.role,
                userId: Item.userId,
                displayName: Item.displayName,
                email: Item.email,
                predictionsWin: Item.predictionsWin,
                predictionsLose: Item.predictionsLose,
                totalPredictions: Item.totalPredictions,
                userName: Item.userName
            };

            return [null, userData];

        } catch (error) {

            return [error, null];
        };

    };

    async updateUser({ id, updateValue, updateKey, userName }) {
        try {

            if (updateKey === "role") {
                if (!userName) throw "UserName is requied!"

                const params = {
                    UserAttributes: [
                        {
                            Name: "custom:role",
                            Value: role,
                        },
                    ],
                    UserPoolId: this.userPoolId,
                    Username: userName,

                };

                const updateResp = await cognitoIdentityServiceProvider
                    .adminUpdateUserAttributes(params)
                    .promise();

                console.log({ updateResp });
            };

            const updateParams = {
                TableName: this.tableName,
                Key: {
                    id: `USER#${id}`,
                    details: "details"
                },
                UpdateExpression: `SET #role = :role`,
                ExpressionAttributeNames: {
                    "#role": updateKey,
                },
                ExpressionAttributeValues: {
                    ":role": updateValue
                },
                ReturnValues: 'UPDATED_NEW'
            }

            const [err, resp] = await put(updateParams);

            if (err) throw err;

            return [null, resp];

        } catch (error) {
            return [error, null];
        }
    }


    async listUsers(role) {
        try {

            const params = {
                TableName: this.tableName,
                IndexName: this.indexName,
                KeyConditionExpression: `#role = :role`,
                ExpressionAttributeNames: {
                    "#role": "role"
                },
                ExpressionAttributeValues: {
                    ":role": role
                }
            };

            //debugger
            console.log(`params: ${JSON.stringify(params)}`);

            const [err, succ] = await query(params);

            if (err) throw err;

            return [null, succ];

        } catch (error) {
            return [error, null];
        }
    };

};