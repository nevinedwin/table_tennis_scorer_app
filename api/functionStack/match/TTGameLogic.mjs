import { post, put, get } from 'libs/db-lib/index.mjs';
import { v4 as uuidV4 } from 'uuid';

const WINNING_SCORE = 11;

const MatchStatus = {
    Live: "LIVE",
    Finished: "FINISHED",
    Pending: "PENDING",
    Cancelled: "Cancelled"
};



export class TableTennisGame {
    constructor(repository, matchId, tableName) {
        this.tableName = tableName;
        this.repository = repository;
        this.matchId = matchId;
        this.team1Set1Score = 0;
        this.team2Set1Score = 0;
        this.team1Set2Score = 0;
        this.team2Set2Score = 0;
        this.team1Set3Score = 0;
        this.team2Set3Score = 0;
        this.currentSet = 1;
        this.undoHistory = {};
        this.undoHistoryId = "";
        this.team1Id = "";
        this.team2Id = "";
        this.winner = null;
        this.team1SetScore = 0;
        this.team2SetScore = 0;
        this.matchStatus = MatchStatus.Live
        this.date = null;
        this.matchNumber = null;
        this.team1Voting = 0;
        this.team2Voting = 0;
        this.totalVoting = 0;
        this.votingStarted = false;
        this.set1Winner = null;
        this.set2Winner = null;
        this.set3Winner = null;
        this.team1Point = 0;
        this.team2Point = 0;
        this.team1MatchPlayed = 0;
        this.team1MatchLose = 0;
        this.team1MatchWon = 0;
        this.team2MatchPlayed = 0;
        this.team2MatchLose = 0;
        this.team2MatchWon = 0;
        this.showMatch = true;
    }

    async initialize() {


        const [err, matchData] = await this.getMatchData();

        //debugger
        console.log(`matchData: ${JSON.stringify(matchData)}`);

        if (err) throw err;

        if (matchData) {
            this.team1Set1Score = matchData.team1Set1Score;
            this.team1Set2Score = matchData.team1Set2Score;
            this.team1Set3Score = matchData.team1Set3Score;
            this.team1SetScore = matchData.team1SetScore;
            this.team2Set1Score = matchData.team2Set1Score;
            this.team2Set2Score = matchData.team2Set2Score;
            this.team2Set3Score = matchData.team2Set3Score;
            this.team2SetScore = matchData.team2SetScore;
            this.undoHistoryId = matchData.undoHistoryId;
            this.winner = matchData.winner;
            this.team1Id = matchData.team1Id;
            this.team2Id = matchData.team2Id;
            this.matchStatus = matchData.matchStatus;
            this.date = matchData.date;
            this.matchNumber = matchData.matchNumber;
            this.team1Voting = matchData.team1Voting;
            this.team2Voting = matchData.team2Voting;
            this.totalVoting = matchData.totalVoting;
            this.votingStarted = matchData.votingStarted;
            this.set1Winner = matchData.set1Winner;
            this.set2Winner = matchData.set2Winner;
            this.set3Winner = matchData.set3Winner;
            this.currentSet = matchData.currentSet;
            this.team1Point = matchData.team1Point;
            this.team2Point = matchData.team2Point;
            this.team1MatchPlayed = matchData.team1MatchPlayed;
            this.team2MatchPlayed = matchData.team2MatchPlayed;
            this.team1MatchWon = matchData.team1MatchWon;
            this.team2MatchWon = matchData.team2MatchWon;
            this.team1MatchLose = matchData.team1MatchLose;
            this.team2MatchLose = matchData.team2MatchLose;
            this.showMatch = matchData.showMatch;
        };
    };


    async scorePoint(teamId) {


        if (this.winner) throw "Game Is Already Over";


        const scoredTeamNumber = teamId === this.team1Id ? 1 : 2;

        //debugger
        console.log(`scoredTeamNumber: ${JSON.stringify(scoredTeamNumber)}`);

        if (this.currentSet === 1) {
            if (scoredTeamNumber === 1) {
                this.team1Set1Score += 1;
            } else {
                this.team2Set1Score += 1;
            }
        } else if (this.currentSet === 2) {
            if (scoredTeamNumber === 1) {
                this.team1Set2Score += 1;
            } else {
                this.team2Set2Score += 1;
            }
        } else if (this.currentSet === 3) {
            if (scoredTeamNumber === 1) {
                this.team1Set3Score += 1;
            } else {
                this.team2Set3Score += 1;
            }
        } else {
            throw "Set is Not Valid"
        };


        if (this.isSetWinner(scoredTeamNumber)) {
            if (scoredTeamNumber === 1) {
                this.team1SetScore += 1;
                if (this.currentSet === 1) {
                    this.set1Winner = this.team1Id;
                    await this.updateSets(this.currentSet);
                    this.currentSet += 1;
                } else if (this.currentSet === 2) {
                    this.set2Winner = this.team1Id;
                    await this.updateSets(this.currentSet);
                    this.currentSet += 1;
                } else {
                    this.set3Winner = this.team1Id;
                }
            } else {
                this.team2SetScore += 1;
                if (this.currentSet === 1) {
                    this.set1Winner = this.team2Id;;
                    await this.updateSets(this.currentSet);
                    this.currentSet += 1;
                } else if (this.currentSet === 2) {
                    this.set2Winner = this.team2Id;
                    await this.updateSets(this.currentSet);                    
                    this.currentSet += 1;
                } else {
                    this.set2Winner = this.team2Id;
                }
            }

            if (this.team1SetScore >= 2) {
                this.winner = this.team1Id;
                this.team1Point += 2;
                this.team1MatchPlayed += 1;
                this.team1MatchWon += 1;
                this.team2MatchLose += 1;
            } else if (this.team2SetScore >= 2) {
                this.winner = this.team2Id;
                this.team2Point += 2;
                this.team2MatchPlayed += 1;
                this.team2MatchWon += 1;
                this.team1MatchLose += 1;
            };
        };


        //debugger
        console.log(`this:`, this);

        await this.recordAction({ action: "score", scoredTeamNumber });
        await this.saveMatchData();
        return this.getMatchState();
    }

    async undoLastAction() {


        const getHistoryParams = {
            TableName: this.tableName,
            Key: {
                id: this.undoHistoryId,
                details: `${this.matchId}#undo`
            }
        }

        //debugger
        console.log(`getHistoryParams: ${JSON.stringify(getHistoryParams)}`);

        const [err, succ] = await get(getHistoryParams);

        //debugger
        console.log(`succ: ${JSON.stringify(succ)}`);

        if (err) throw err;

        this.undoHistory = succ?.Item || {};

        if (Object.keys(this.undoHistory).length === 0) throw "No action to Undo";

        const lastAction = this.undoHistory;
        this.team1Set1Score = lastAction.team1Set1Score;
        this.team2Set1Score = lastAction.team2Set1Score;
        this.team1Set2Score = lastAction.team1Set2Score;
        this.team2Set2Score = lastAction.team2Set2Score;
        this.team1Set3Score = lastAction.team1Set3Score;
        this.team2Set3Score = lastAction.team2Set3Score;
        this.team1SetScore = lastAction.team1SetScore;
        this.team2SetScore = lastAction.team2SetScore;
        this.undoHistoryId = lastAction.undoHistoryId;
        this.winner = lastAction.winner;
        this.team1Id = lastAction.team1Id;
        this.team2Id = lastAction.team2Id;
        this.matchStatus = lastAction.matchStatus;
        this.date = lastAction.date;
        this.matchNumber = lastAction.matchNumber;
        this.team1Voting = lastAction.team1Voting;
        this.team2Voting = lastAction.team2Voting;
        this.totalVoting = lastAction.totalVoting;
        this.votingStarted = lastAction.votingStarted;
        this.set1Winner = lastAction.set1Winner;
        this.set2Winner = lastAction.set2Winner;
        this.set3Winner = lastAction.set3Winner;
        this.currentSet = lastAction.currentSet;
        this.team1Point = lastAction.team1Point;
        this.team2Point = lastAction.team2Point;
        this.team1MatchPlayed = lastAction.team1MatchPlayed;
        this.team2MatchPlayed = lastAction.team2MatchPlayed;
        this.team1MatchWon = lastAction.team1MatchWon;
        this.team2MatchWon = lastAction.team2MatchWon;
        this.team1MatchLose = lastAction.team1MatchLose;
        this.team2MatchLose = lastAction.team2MatchLose;
        this.showMatch = lastAction.showMatch;


        //debugger
        console.log(`saveMatchData:`);

        await this.saveMatchData();
        return this.getMatchState();
    }

    isSetWinner(scoredTeamNumber) {
        if (this.currentSet === 1) {
            if (scoredTeamNumber === 1) {
                if (this.team1Set1Score >= WINNING_SCORE && this.team1Set1Score - this.team2Set1Score >= 2) {
                    return true;
                }
            } else {
                if (this.team2Set1Score >= WINNING_SCORE && this.team2Set1Score - this.team1Set1Score >= 2) {
                    return true;
                }
            }
        } else if (this.currentSet === 2) {
            if (scoredTeamNumber === 1) {
                if (this.team1Set2Score >= WINNING_SCORE && this.team1Set2Score - this.team2Set2Score >= 2) {
                    return true;
                }
            } else {
                if (this.team2Set2Score >= WINNING_SCORE && this.team2Set2Score - this.team1Set2Score >= 2) {
                    return true;
                }
            }
        } else if (this.currentSet === 3) {
            if (scoredTeamNumber === 1) {
                if (this.team1Set3Score >= WINNING_SCORE && this.team1Set3Score - this.team2Set3Score >= 2) {
                    return true;
                }
            } else {
                if (this.team2Set3Score >= WINNING_SCORE && this.team2Set3Score - this.team1Set3Score >= 2) {
                    return true;
                }
            }
        } else {
            return false;
        };
    };

    async recordAction(action) {

        //debugger
        console.log(`Entered Record action:`);

        this.undoHistory = {
            action: action.action,
            scoredTeamNumber: action.scoredTeamNumber,
            team1Set1Score: this.team1Set1Score,
            team1Set2Score: this.team1Set2Score,
            team1Set3Score: this.team1Set3Score,
            team1SetScore: this.team1SetScore,
            team2Set1Score: this.team2Set1Score,
            team2Set2Score: this.team2Set2Score,
            team2Set3Score: this.team2Set3Score,
            team2SetScore: this.team2SetScore,
            undoHistoryId: this.undoHistoryId,
            winner: this.winner,
            team1Id: this.team1Id,
            team2Id: this.team2Id,
            matchStatus: this.matchStatus,
            date: this.date,
            matchNumber: this.matchNumber,
            team1Voting: this.team1Voting,
            team2Voting: this.team2Voting,
            totalVoting: this.totalVoting,
            votingStarted: this.votingStarted,
            set1Winner: this.set1Winner,
            set2Winner: this.set2Winner,
            set3Winner: this.set3Winner,
            currentSet: this.currentSet,
            team1Point: this.team1Point,
            team2Point: this.team2Point,
            team1MatchPlayed: this.team1MatchPlayed,
            team2MatchPlayed: this.team2MatchPlayed,
            team1MatchWon: this.team1MatchWon,
            team2MatchWon: this.team2MatchWon,
            team1MatchLose: this.team1MatchLose,
            team2MatchLose: this.team2MatchLose,
            showMatch: this.showMatch
        };

        const undoId = uuidV4();
        this.undoHistoryId = undoId;

        const saveParams = {
            TableName: this.tableName,
            Item: {
                id: undoId,
                details: `${this.matchId}#undo`,
                role: this.matchId,
                ...this.undoHistory
            }
        };

        //debugger
        console.log(`saveParams: ${JSON.stringify(saveParams)}`);

        const [err, succ] = await post(saveParams);

        if (err) throw err;
    };


    async getMatchData() {

        try {
            // get Match data

            //debugger
            console.log(`this: ${JSON.stringify(this)}`);
            const [err, matchData] = await this.repository.getMatch(this.matchId)

            if (err) throw err;

            const match = matchData?.Item || {};

            // get1Team data
            const [team1Err, team1] = await this.repository.fetchTeam(match.team1Id);

            if (team1Err) throw team1Err;

            const team1Data = team1?.Item || {};

            // get2Team data
            const [team2Err, team2] = await this.repository.fetchTeam(match.team2Id);

            if (team2Err) throw team2Err;

            const team2Data = team2?.Item || {};

            // get match set data
            const [matchSet1Err, matchSet1Data] = await this.repository.getMatchSet(this.matchId, 1);

            if (matchSet1Err) throw matchSet1Err;

            const [matchSet2Err, matchSet2Data] = await this.repository.getMatchSet(this.matchId, 2);

            if (matchSet2Err) throw matchSet2Err;

            const [matchSet3Err, matchSet3Data] = await this.repository.getMatchSet(this.matchId, 3);

            if (matchSet3Err) throw matchSet3Err;

            const matchSet = {
                1: matchSet1Data.Item || {},
                2: matchSet2Data.Item || {},
                3: matchSet3Data.Item || {},
            };

            //debugger
            console.log(`Enetered Here 1:`);

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
                undoHistoryId: match?.undoHistoryId || null,
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
                team2MatchLose: team2Data?.matchLose || 0,
                showMatch: match?.showMatch || false
            };

            //debugger
            console.log(`returnData: ${JSON.stringify(returnData)}`);

            return [null, returnData];

        } catch (error) {
            //debugger
            console.log(`Error in fetching Data: ${JSON.stringify(error)}`);

            return [error, null];
        }
    };


    async saveMatchData() {

        //debugger
        console.log(`Entered save matchData: `);

        // set matchData
        const matchParams = {
            TableName: this.tableName,
            Item: {
                id: this.matchId,
                details: "match",
                date: this.date,
                matchNumber: this.matchNumber,
                matchStatus: this.matchStatus,
                role: "MATCH",
                team1Id: this.team1Id,
                team1SetScore: this.team1SetScore,
                team1Voting: this.team1Voting,
                team2Id: this.team2Id,
                team2SetScore: this.team2SetScore,
                team2Voting: this.team2Voting,
                totalVoting: this.totalVoting,
                votingStarted: this.votingStarted,
                undoHistoryId: this.undoHistoryId,
                winner: this.winner,
                currentSet: this.currentSet,
                showMatch: this.showMatch
            }
        };

        //debugger
        console.log(`matchParams:`, matchParams);

        const [writeMatchErr, writeMatch] = await post(matchParams);

        if (writeMatchErr) throw writeMatchErr;

        console.log(this.currentSet === 1 ? this.team1Set1Score : this.currentSet === 2 ? this.team1Set2Score : this.team1Set3Score);

        // set setmatch
        const setParams = {
            TableName: this.tableName,
            Item: {
                id: this.matchId,
                details: `set#${this.currentSet}`,
                setNumber: this.currentSet,
                role: "MATCH#SET",
                winner: this.currentSet === 1 ? this.set1Winner : this.currentSet === 2 ? this.set2Winner : this.set3Winner,
                team1Score: this.currentSet === 1 ? this.team1Set1Score : this.currentSet === 2 ? this.team1Set2Score : this.team1Set3Score,
                team2Score: this.currentSet === 1 ? this.team2Set1Score : this.currentSet === 2 ? this.team2Set2Score : this.team2Set3Score,
            }
        }

        //debugger
        console.log(`setParams: ${JSON.stringify(setParams)}`);

        const [writeSetErr, writeSet] = await post(setParams);

        if (writeSetErr) throw writeSetErr;


        // update team data

        if (this.winner) {

            // update team 1;
            const updateParams = {
                TableName: this.tableName,
                Key: {
                    id: this.team1Id,
                    details: "details",
                },
                UpdateExpression: `SET #matchWon = :matchWon, #matchLose = :matchLose, #matchPlayed = :matchPlayed, #point = :point`,
                ExpressionAttributeNames: {
                    "#matchWon": "matchWon",
                    "#matchLose": "matchLose",
                    "#matchPlayed": "matchPlayed",
                    "#point": "point"
                },
                ExpressionAttributeValues: {
                    ":matchWon": this.team1MatchWon,
                    ":matchLose": this.team1MatchLose,
                    ":matchPlayed": this.team1MatchPlayed,
                    ":point": this.team1Point
                }
            };


            //debugger
            console.log(`updateParams: ${JSON.stringify(updateParams)}`);

            const [udpate1Err, update1Resp] = await put(updateParams);

            if (udpate1Err) throw udpate1Err;


            // update team 1;
            const update2Params = {
                TableName: this.tableName,
                Key: {
                    id: this.team2Id,
                    details: "details",
                },
                UpdateExpression: `SET #matchWon = :matchWon, #matchLose = :matchLose, #matchPlayed = :matchPlayed, #point = :point`,
                ExpressionAttributeNames: {
                    "#matchWon": "matchWon",
                    "#matchLose": "matchLose",
                    "#matchPlayed": "matchPlayed",
                    "#point": "point"
                },
                ExpressionAttributeValues: {
                    ":matchWon": this.team2MatchWon,
                    ":matchLose": this.team2MatchLose,
                    ":matchPlayed": this.team2MatchPlayed,
                    ":point": this.team2Point
                }
            };


            //debugger
            console.log(`update2Params: ${JSON.stringify(update2Params)}`);

            const [udpate2Err, update2Resp] = await put(update2Params);

            if (udpate2Err) throw udpate2Err;

        }
    };

    async updateSets(setNumber) {
        try {

            // set setmatch
            const setParams = {
                TableName: this.tableName,
                Item: {
                    id: this.matchId,
                    details: `set#${setNumber}`,
                    setNumber: setNumber,
                    role: "MATCH#SET",
                    winner: setNumber === 1 ? this.set1Winner : setNumber === 2 ? this.set2Winner : this.set3Winner,
                    team1Score: setNumber === 1 ? this.team1Set1Score : setNumber === 2 ? this.team1Set2Score : this.team1Set3Score,
                    team2Score: setNumber === 1 ? this.team2Set1Score : setNumber === 2 ? this.team2Set2Score : this.team2Set3Score,
                }
            }

            //debugger
            console.log(`setParams: ${JSON.stringify(setParams)}`);

            const [writeSetErr, writeSet] = await post(setParams);

            if (writeSetErr) throw writeSetErr;
        } catch (error) {

            //debugger
            console.log(`error: ${JSON.stringify(error)}`);

            throw error;
        };
    }
    getMatchState() {
        return {
            matchId: this.matchId,
            team1Set1Score: this.team1Set1Score,
            team1Set2Score: this.team2Set1Score,
            team1Set3Score: this.team1Set3Score,
            team2Set1Score: this.team2Set1Score,
            team2Set2Score: this.team2Set2Score,
            team2Set3Score: this.team2Set3Score,
            team1SetScore: this.team1SetScore,
            team2SetScore: this.team2SetScore,
            undoHistory: this.undoHistory,
            undoHistoryId: this.undoHistoryId,
            winner: this.winner,
            team1Id: this.team1Id,
            team2Id: this.team2Id,
            matchStatus: this.matchStatus,
            date: this.date,
            matchNumber: this.matchNumber,
            team1Voting: this.team1Voting,
            team2Voting: this.team2Voting,
            totalVoting: this.totalVoting,
            votingStarted: this.votingStarted,
            set1Winner: this.set1Winner,
            set2Winner: this.set2Winner,
            set3Winner: this.set3Winner,
            currentSet: this.currentSet,
            team1Point: this.team1Point,
            team2Point: this.team2Point,
            team1MatchPlayed: this.team1MatchPlayed,
            team2MatchPlayed: this.team2MatchPlayed,
            team1MatchWon: this.team1MatchWon,
            team2MatchWon: this.team2MatchWon,
            team1MatchLose: this.team1MatchLose,
            team2MatchLose: this.team2MatchLose,
            showMatch: this.showMatch
        };
    }
}