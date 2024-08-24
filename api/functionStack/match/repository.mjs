import { get, post, query, del } from 'libs/db-lib/index.mjs';
import { v4 as uuidV4 } from 'uuid';

const MatchStatus = {
    Live: "LIVE",
    Finished: "FINISHED",
    Pending: "PENDING",
    Cancelled: "Cancelled"
};


export class MatchRepository {

    constructor(tableName, indexName) {
        this.tableName = tableName;
        this.indexName = indexName;
    };

    async createMatch(data) {
        try {

            const {
                id = null,
                date,
                team1Id,
                team2Id,
                team1SetScore = 0,
                team2SetScore = 0,
                matchStatus = MatchStatus.Pending,
                matchResult = null,
                votingStarted,
                team1Voting = 0,
                team2Voting = 0,
                totalVoting = 0,
                matchNumber
            } = data;

            const matchId = id || uuidV4();



            const params = {
                TableName: this.tableName,
                Item: {
                    id: matchId,
                    details: `match`,
                    date,
                    team1Id,
                    team2Id,
                    team1SetScore,
                    team2SetScore,
                    matchStatus,
                    matchResult,
                    votingStarted,
                    team1Voting,
                    team2Voting,
                    totalVoting,
                    matchNumber,
                    role: "MATCH",
                    sf: `${matchId} ${date} ${team1Id} ${team2Id} ${team1SetScore} ${team2SetScore} ${team1Voting} ${team2Voting} ${matchStatus} ${matchResult}`
                }
            };

            //debugger
            console.log(`params: ${JSON.stringify(params)}`);


            const [err, succ] = await post(params);

            if (err) throw err;

            return [null, matchId];

        } catch (error) {
            return [error, null];
        };
    };


    async createSetForMatches(matchId, setNumber = 1) {
        try {

            const params = {
                TableName: this.tableName,
                Item: {
                    id: matchId,
                    details: `set#${setNumber}`,
                    team1Score: 0,
                    team2Score: 0,
                    setResult: null,
                    setNumber,
                    role: "MATCH#SET"
                }
            }

            const [err, succ] = await post(params);

            if (err) throw err;

            return [null, succ];

        } catch (error) {
            return [error, null];
        };
    };


    async listMatches() {
        try {

            const params = {
                TableName: this.tableName,
                IndexName: this.indexName,
                KeyConditionExpression: `#role = :role`,
                ExpressionAttributeNames: {
                    "#role": "role"
                },
                ExpressionAttributeValues: {
                    ":role": "MATCH"
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
    };


    async listMatchSets() {
        try {

            const params = {
                TableName: this.tableName,
                IndexName: this.indexName,
                KeyConditionExpression: `#role = :role`,
                ExpressionAttributeNames: {
                    "#role": "role"
                },
                ExpressionAttributeValues: {
                    ":role": "MATCH#SET"
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
    };


    async listTeam() {
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

            return [null, succ];

        } catch (error) {
            console.log(`Error in Repo: ${JSON.stringify(error)}`);
            return [error, null];
        };
    };


    combineListDatas(matches, sets, teams) {
        // map team based on Id;
        const teamMap = teams.reduce((map, team) => {
            map[team.id] = team;
            return map;
        }, {})


        //debugger
        console.log(`teamMap: ${JSON.stringify(teamMap)}`);

        // map sets based on id;
        const setMap = sets.reduce((map, matchSet) => {
            if (!map[matchSet.id]) {
                map[matchSet.id] = {};
            };

            map[matchSet.id] = {
                ...map[matchSet.id],
                [matchSet.setNumber]: matchSet
            };

            return map;

        }, {})

        //debugger
        console.log(`setMap: ${JSON.stringify(setMap)}`);

        const combineData = matches.map((match) => {

            //debugger
            console.log(`match: ${JSON.stringify(match)}`);

            const team1 = teamMap[match.team1Id];
            const team2 = teamMap[match.team2Id];
            const matchSet = setMap[match.id];

            //debugger
            console.log(`team1: ${JSON.stringify(team1)}`);


            //debugger
            console.log(`team2: ${JSON.stringify(team2)}`);

            //debugger
            console.log(`matchSet: ${JSON.stringify(matchSet)}`);


            const returnValue = {
                matchId: match?.id || null,
                matchNumber: match?.matchNumber || null,
                date: match?.date || null,
                team1Id: match?.team1Id || null,
                team1Name: team1?.teamName || null,
                team1Player1Name: team1?.player1Name || null,
                team1Player2Name: team1?.player2Name || null,
                team1Set1Score: matchSet["1"]?.team1Score || 0,
                team1Set2Score: matchSet["2"]?.team1Score || 0,
                team1Set3Score: matchSet["3"]?.team1Score || 0,
                team1SetScore: match?.team1SetScore || 0,
                team1Voting: match?.team1Voting || 0,
                team2Id: match?.team2Id || null,
                team2Name: team2?.teamName || null,
                team2Player1Name: team2?.player1Name || null,
                team2Player2Name: team2?.player2Name || null,
                team2Set1Score: matchSet["1"]?.team2Score || 0,
                team2Set2Score: matchSet["2"]?.team2Score || 0,
                team2Set3Score: matchSet["3"]?.team2Score || 0,
                team2SetScore: match?.team2SetScore || 0,
                team2Voting: match?.team2Voting || 0,
                votingStarted: match?.votingStarted || false,
                totalVoting: match.totalVoting || 0,
                matchResult: match?.matchResult || null,
                matchStatus: match?.matchStatus || null,
            };

            //debugger
            console.log(`returnValue: ${JSON.stringify(returnValue)}`);

            return returnValue;
        })

        return combineData;
    }


    async fetchMatch(id) {
        try {

            const params = {
                TableName: this.tableName,
                KeyConditionExpression: `#id = :id AND begins_with(#details, :details)`,
                ExpressionAttributeNames: {
                    "#id": "id",
                    "#details": "details"
                },
                ExpressionAttributeValues: {
                    ":id": id,
                    ":details": "match"
                }
            };

            // debugger
            console.log(`fetch params: ${JSON.stringify(params)}`);

            const [err, succ] = await query(params);


            if (err || !succ) throw err;

            return [null, succ];

        } catch (error) {

            return [error, null];
        };

    };


    async deleteMatch(id) {
        try {
            const params = {
                TableName: this.tableName,
                Key: {
                    id,
                    details: "match"
                }
            };

            console.log({params});

            const [err, deleteSucc] = await del(params);

            console.log({err});

            if (err) throw err;

            //debugger
            console.log(`del: ${JSON.stringify(del)}`);

            return [null, deleteSucc]

        } catch (error) {
            return [error, null];
        }
    };

    async deleteSets(id, setNumber) {
        try {

            const params = {
                TableName: this.tableName,
                Key: {
                    id,
                    details: `set#${setNumber}`
                }
            };

            const [err, succ] = await del(params);

            //debugger
            console.log(`succ: ${JSON.stringify(succ)}`);

            if (err) throw err;

            return [null, succ];

        } catch (error) {
            return [error, null];
        }
    }

};