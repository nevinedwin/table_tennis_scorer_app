const AWS = require("aws-sdk");
const { update, fetch, post } = require("shared/db.shared.js");
const { getCurrentDate } = require("libs/date-lib");


export class PostLoginRepository {

    constructor(tableName) {

        this.tableName = tableName;
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

            const [err, updatedbResp] = await update(params, false);

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
};

