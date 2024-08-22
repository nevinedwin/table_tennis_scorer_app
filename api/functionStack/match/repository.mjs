import { get, post } from 'libs/db-lib/index.mjs';
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
                    details: date,
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
                    role: "MATCH#SET"
                }
            }

            const [err, succ] = await post(params);

            if (err) throw err;

            return [null, succ];

        } catch (error) {
            return [error, null];
        }
    }




};