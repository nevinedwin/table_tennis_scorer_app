import AWS from "aws-sdk";
import { post } from "libs/db-lib/index.mjs";

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();



export class PostSignUpRepository {

    constructor(tableName, poolId, userName) {

        this.tableName = tableName;
        this.userPoolId = poolId;
        this.userName = userName;
    };


    async updateRole(role) {
        try {

            const params = {
                UserAttributes: [
                    {
                        Name: "custom:role",
                        Value: role,
                    },
                ],
                UserPoolId: this.userPoolId,
                Username: this.userName,
            };

            const updateResp = await cognitoIdentityServiceProvider
                .adminUpdateUserAttributes(params)
                .promise();

            console.log({ updateResp });

            return [null, updateResp];

        } catch (error) {

            return [error];
        };
    };


    async adduser({ id, email, role, name, userName }) {
        try {

            const params = {
                TableName: this.tableName,
                Item: {
                    id: `USER#${id}`,
                    details: "details",
                    email,
                    userId: id,
                    displayName: name,
                    role,
                    totalPredictions: 0,
                    predictionsWin: 0,
                    predictionsLose: 0,
                    userName,
                    teamId: null,
                    sf: `${id} ${email} ${name} ${role}`
                },
            };

            console.log(`dbUploadParams: ${JSON.stringify(params)}`);

            const [err, succ] = await post(params);

            if (err) throw `Error occured in uploading user date to db: ${JSON.stringify(err)}`;

            console.log(`succ: ${JSON.stringify(succ)}`);

            return [null, succ];

        } catch (error) {

            return [error];
        };
    };
};
