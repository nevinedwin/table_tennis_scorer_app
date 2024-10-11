import { get, post, query, del, put } from 'libs/db-lib/index.mjs'
import { v4 as uuidV4 } from 'uuid';


export class TeamRepository {

    constructor(tableName, indexName) {
        this.tableName = tableName;
        this.indexName = indexName;
    };


    async getUser(userId) {

        try {

            const params = {
                TableName: this.tableName,
                Key: {
                    id: `USER#${userId}`,
                    details: "details"
                }
            };

            const [err, succ] = await get(params);


            if (err || !succ) throw err;

            const { Item } = succ;

            return [null, Item.displayName];

        } catch (error) {
            return [error, null];
        };
    };


    async create(data) {

        try {

            // debugger
            console.log(`Data: ${JSON.stringify(data)}`);

            const { player1Name, player2Name, player1Email, player2Email, createdBy, teamName, id = null, pool, league = null } = data;

            const params = {
                TableName: this.tableName,
                Item: {
                    id: id || uuidV4(),
                    details: `details`,
                    role: "TEAM",
                    player1Name,
                    player2Name,
                    player1Email,
                    player2Email,
                    createdBy,
                    teamName,
                    matchWon: 0,
                    matchLose: 0,
                    matchPlayed: 0,
                    point:0,
                    pool,
                    league,
                    sf: `${player1Email} ${player2Email} ${player1Name} ${player2Name} ${teamName} ${createdBy}`
                }
            };

            // debugger
            console.log(`create params: ${JSON.stringify(params)}`);

            const [err, resp] = await post(params)

            if (err) throw err;

            return [null, resp];

        } catch (error) {

            return [error, null];
        };
    };


    async findPlayerAlreadyInTeam(playerEmail) {
        try {

            let isPresent = false;

            const [err, userList] = await this.listUser();

            if (err) throw err;

            const user = userList.Items;

            if (user.length) {
                const userPresent = user.find(eachData => eachData.player1Email === playerEmail || eachData.player2Email === playerEmail);

                if (userPresent) {
                    isPresent = true;
                };
            };

            return [null, isPresent];

        } catch (error) {

            // debugger
            console.log(`Error in repository: ${JSON.stringify(error)}`);

            return [error, null];
        };
    };


    async listUser() {
        try {

            const params = {
                TableName: this.tableName,
                IndexName: this.indexName,
                KeyConditionExpression: `#role = :role`,
                ExpressionAttributeNames: {
                    "#role": "role"
                },
                ExpressionAttributeValues: {
                    ":role": "TEAM"
                }
            };

            //debugger
            console.log(`params: ${JSON.stringify(params)}`);

            const [err, succ] = await query(params);

            if (err) return err;

            //debugger
            console.log(`users: ${JSON.stringify(succ)}`);

            return [null, succ];

        } catch (error) {
            console.log(`Error in Repo: ${JSON.stringify(error)}`);
            return [error, null];
        };
    };


    quickSortTeam(arr) {
        if (arr.length <= 1) {
            return arr;
        };

        let pivot = arr[arr.length - 1];
        let left = [];
        let right = [];

        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i]?.teamName.localeCompare(pivot?.teamName) < 0) {
                left.push(arr[i]);
            } else {
                right.push(arr[i])
            }
        };


        return [...this.quickSortTeam(left), pivot, ...this.quickSortTeam(right)];
    };


    async deleteTeam(id) {

        try {

            //debugger
            console.log(`id: ${JSON.stringify(id)}`);

            const params = {
                TableName: this.tableName,
                Key: {
                    id,
                    details: "details"
                }
            };

            //debugger
            console.log(`params: ${JSON.stringify(params)}`);

            const [err, resp] = await del(params);

            if (err) throw err;

            //debugger
            console.log(`resp: ${JSON.stringify(resp)}`);

            return [null, resp];

        } catch (error) {

            return [error, null];
        };
    };

    async fetchTeam(id) {
        try {

            const params = {
                TableName: this.tableName,
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

    async updateSigleTeam(teamId, updateKey, updateValue) {
        try {

            const params = {
                TableName: this.tableName,
                Key: {
                    id: teamId,
                    details: "details"
                },
                UpdateExpression: `SET #keyItem = :valueItem`,
                ExpressionAttributeNames: {
                    "#keyItem": updateKey,
                },
                ExpressionAttributeValues: {
                    ":valueItem": updateValue
                },
                ReturnValues: 'UPDATED_NEW'
            };

            const [err, resp] = await put(params);

            if (err) throw err;

            return [null, resp];

        } catch (error) {
            return [error, null];
        };
    };


};