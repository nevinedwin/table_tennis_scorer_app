import { get, post, query } from 'libs/db-lib/index.mjs'
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

            const { player1Name, player2Name, player1Email, player2Email, createdBy, teamName } = data;

            const params = {
                TableName: this.tableName,
                Item: {
                    id: uuidV4(),
                    details: `${teamName}#${player1Email}#${player2Email}`,
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

            const params = {
                TableName: this.tableName,
                IndexName: this.indexName,
                KeyConditionExpression: "#role = :role",
                FilterExpression: "contains(details, :email)",
                ExpressionAttributeNames: {
                    "#role": "role"
                },
                ExpressionAttributeValues: {
                    ":email": playerEmail,
                    ":role": "TEAM"
                }
            };

            const [err, resp] = await query(params);

            if (err) throw err;

            let isPresent = false;
            if (resp.Items.length) {

                isPresent = true
            };

            return [null, isPresent];

        } catch (error) {

            // debugger
            console.log(`Error in repository: ${JSON.stringify(error)}`);

            return [error, null];
        };
    };

};