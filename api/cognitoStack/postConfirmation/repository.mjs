const AWS = require("aws-sdk");
const { put, get, post } = require("libs/db-lib");
const { getCurrentDate } = require("libs/date-lib");

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();



class PostSignUpRepository {

    constructor(tableName, poolId, userName) {

        this.tableName = tableName;
        this.userPoolId = poolId;
        this.userName = userName;
    };


    async getVersion() {
        try {

            // fetching td version
            const params = {
                TableName: this.tableName,
                Key: {
                    userGameId: "techday",
                    userGameDetails: "details",
                },
            };

            console.log(`getVersionParams: ${JSON.stringify(params)}`);

            const [err, getTechdayVersionResp] = await fetch(params, false);

            if (err) throw err;

            return [null, getTechdayVersionResp];

        } catch (error) {

            console.log(`Error in getTechdayVersionHelper: ${JSON.stringify(error)}`);

            return [error];
        }
    };


    async updateLogin(id) {
        try {

            const params = {
                TableName: this.tableName,
                Key: {
                    userGameId: id,
                    userGameDetails: "details",
                },
                UpdateExpression: "set #keyval = :val",
                ExpressionAttributeNames: {
                    "#keyval": "lastLogin",
                },
                ExpressionAttributeValues: {
                    ":val": getCurrentDate(),
                },
            };

            console.log(`updateTableParams: ${JSON.stringify(params)}`);

            const [err, updatedbResp] = await put(params, false);

            console.log(`updatedbResp: ${JSON.stringify(updatedbResp)}`);

            return [null, updatedbResp];

        } catch (error) {

            return [error];
        };
    };


    async fetchVUser(id, version) {
        try {

            const params = {
                TableName: this.tableName,
                Key: {
                    userGameId: id,
                    userGameDetails: `details#${version}`,
                },
            };

            console.log(`getUserVersion Details: ${JSON.stringify(params)}`);

            const [err, getUserVersionResp] = await fetch(params, false);

            if (err) throw err;

            return [null, getUserVersionResp];

        } catch (error) {

            return [error];
        };
    };

    async fetchUser(id) {
        try {

            const params = {
                TableName: this.tableName,
                Key: {
                    userGameId: id,
                    userGameDetails: "details"
                }
            };

            const [err, succ] = await fetch(params, false);

            if (err) throw err;

            return [null, succ];

        } catch (error) {

            return [err];
        };
    };

    async createUserVersion(id, version) {
        try {

            // fetch user details
            const [userErr, userResp] = await this.fetchUser(id);

            if (userErr) throw userErr;

            const { email, name, role, status } = userResp;

            // create user version params
            const params = {
                TableName: this.tableName,
                Item: {
                    userGameId: id,
                    userGameDetails: `details#${version}`,
                    email,
                    role,
                    totalScore: 0,
                    name,
                    status,
                    cdt: getCurrentDate(),
                    mdt: getCurrentDate(),
                    modifiedBy: id
                }
            };

            const [err, createResp] = await post(params);

            console.log(`createResp: ${JSON.stringify(createResp)}`);

            if (err) throw err;

            return [null, createResp];

        } catch (error) {

            return [error];
        };
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

            const currentDate = getCurrentDate();

            console.log(`currentDate: ${currentDate}`);

            const params = {
                TableName: this.tableName,
                Item: {
                    userGameId: id,
                    userGameDetails: "details",
                    email,
                    name,
                    role,
                    status: DB_STRINGS.USER_STATUS.ACTIVE,
                    lastLogin: currentDate,
                    cdt: currentDate,
                    totalScore: 0
                },
            };

            console.log(`dbUploadParams: ${JSON.stringify(params)}`);

            const [err, succ] = await post(params);

            if (err) throw `Error occured in uploading user date to db: ${err}`;

            console.log(`succ: ${JSON.stringify(succ)}`);

            return [null, succ];

        } catch (error) {

            return [error];
        };
    };
};


module.exports = {

    PostSignUpRepository
};