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


    async adduser({ id, email, role, name }) {
        try {

            const params = {
                TableName: this.tableName,
                Item: {
                    id,
                    details: `user#${role}`,
                    email,
                    displayName: name,
                    role,
                    totalPredictions: 0,
                    predictionWinScore: 0,
                    predictionLoseScore: 0,
                    teamId: null
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
