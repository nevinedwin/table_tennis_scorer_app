import { post, put } from 'libs/db-lib/index.mjs';

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
        this.undoHistory = [];
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
        this.set1winner = null;
        this.set2winner = null;
        this.set3winner = null;
    }

    async initialize() {
        const [err, matchData] = await this.getMatchData();
        if (err) throw err;
        if (matchData) {
            this.team1Set1Score = matchData.team1Set1Score;
            this.team2Set1Score = matchData.team1Set2Score;
            this.team1Set2Score = matchData.team1Set2Score;
            this.team2Set2Score = matchData.team2Set2Score;
            this.team1Set3Score = matchData.team1Set3Score;
            this.team2Set3Score = matchData.team2Set3Score;
            this.team1SetScore = matchData.team1SetScore;
            this.team2SetScore = matchData.team2SetScore;
            this.undoHistory = matchData.undoHistory;
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
            this.set1winner = matchData.set1winner;
            this.set2winner = matchData.set2winner;
            this.set3winner = matchData.set3winner;
            this.currentSet = matchData.currentSet;
        }

    }


    async scorePoint(teamId) {
        if (this.winner) throw "Game Is Already Over";

        const scoredTeamNumber = teamId === this.team1Id ? 1 : 2;

        if (this.currentSet === 1) {
            if (this.scoredTeamNumber === 1) {
                this.team1Set1Score += 1;
            } else {
                this.team1Set2Score += 1;
            }
        } else if (this.currentSet === 2) {
            if (this.scoredTeamNumber === 1) {
                this.team1Set2Score += 1;
            } else {
                this.team2Set2Score += 1;
            }
        } else if (this.currentSet === 3) {
            if (this.scoredTeamNumber === 1) {
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
                    this.set1winner = this.team1Id;
                } else if (this.currentSet === 2) {
                    this.set2winner = this.team1Id;
                } else {
                    this.set2winner = this.team1Id;
                }
            } else {
                this.team2SetScore += 1;
                if (this.currentSet === 1) {
                    this.set1winner = this.team2Id;;
                } else if (this.currentSet === 2) {
                    this.set2winner = this.team2Id;
                } else {
                    this.set2winner = this.team2Id;
                }
            }

            if (this.team1SetScore >= 2) {
                this.winner = this.team1Id;
            } else if (this.team2SetScore >= 2) {
                this.winner = this.team2Id;
            };
        };

        this.recordAction({ action: "score", scoredTeamNumber });
        await this.saveMatchData();
        return this.getMatchState();
    }

    async undoLastAction() {
        if (this.undoHistory.length === 0) throw "No action to Undo";

        const lastAction = this.undoHistory.pop();
        this.team1Set1Score = lastAction.team1Set1Score;
        this.team2Set1Score = lastAction.team1Set2Score;
        this.team1Set2Score = lastAction.team1Set2Score;
        this.team2Set2Score = lastAction.team2Set2Score;
        this.team1Set3Score = lastAction.team1Set3Score;
        this.team2Set3Score = lastAction.team2Set3Score;
        this.team1SetScore = lastAction.team1SetScore;
        this.team2SetScore = lastAction.team2SetScore;
        this.undoHistory = lastAction.undoHistory;
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
        this.set1winner = lastAction.set1winner;
        this.set2winner = lastAction.set2winner;
        this.set3winner = lastAction.set3winner;
        this.currentSet = lastAction.currentSet;

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

    recordAction(action) {
        this.undoHistory.push({
            action: action.action,
            scoredTeamNumber: action.scoredTeamNumber,
            team1Set1Score: this.team1Set1Score,
            team1Set2Score: this.team2Set1Score,
            team1Set2Score: this.team1Set2Score,
            team2Set2Score: this.team2Set2Score,
            team1Set3Score: this.team1Set3Score,
            team2Set3Score: this.team2Set3Score,
            team1SetScore: this.team1SetScore,
            team2SetScore: this.team2SetScore,
            undoHistory: this.undoHistory,
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
            set1winner: this.set1winner,
            set2winner: this.set2winner,
            set3winner: this.set3winner,
            currentSet: this.currentSet
        })
    };


    async getMatchData() {
        // get Match data
        const [err, matchData] = await this.repository.getMatch(this.matchId)

        if (err) throw err;

        const match = matchData?.Item || {};

        // get1Team data
        const [team1Err, team1] = await this.repository.fetchTeam(this.team1Id);

        if (team1Err) throw team1Err;

        const team1Data = team1?.Item || {};

        // get2Team data
        const [team2Err, team2] = await this.repository.fetchTeam(this.team2Id);

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
            undoHistory: match?.undoHistory || null,
            winner: match?.winner || null,
            currentSet: match?.currentSet || null,
            set1winner: matchSet["1"]?.winner || null,
            set2winner: matchSet["2"]?.winner || null,
            set3winner: matchSet["3"]?.winner || null,
        }

        return returnData;
    };


    async saveMatchData() {
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
                undoHistory: this.undoHistory,
                winner: this.winner,
                currentSet: this.currentSet
            }
        };

        //debugger
        console.log(`matchParams: ${JSON.stringify(matchParams)}`);

        const [writeMatchErr, writeMatch] = await post(matchParams);

        if (writeMatchErr) throw writeMatchErr;

        // set setmatch
        const setParams = {
            TableName: this.tableName,
            Item: {
                id: this.matchId,
                details: `set#${this.currentSet}`,
                setNumber: this.currentSet,
                role: "MATCH#SET",
                winner: this.currentSet === 1 ? this.set1winner : this.currentSet === 2 ? this.set2winner : this.set3winner,
                team1Score: this.currentSet === 1 ? this.team1Set1Score : this.currentSet === 2 ? this.team1Set2Score : this.team1Set3Score,
                team2Score: this.currentSet === 1 ? this.team2Set1Score : this.currentSet === 2 ? this.team2Set2Score : this.team2Set3Score,
            }
        }

        //debugger
        console.log(`setParams: ${JSON.stringify(setParams)}`);

        const [writeSetErr, writeSet] = await post(matchParams);

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
                UpdateExpression: `ADD #matchWon :matchWon, #matchLose :matchLose, #matchPlayed :matchPlayed`,
                ExpressionAttributeNames: {
                    "#matchWon": "matchWon",
                    "#matchLose": "matchLose",
                    "#matchPlayed": "matchPlayed"
                },
                ExpressionAttributeValues: {
                    ":matchWon": this.winner === this.team1Id ? 1 : 0,
                    ":matchLose": this.winner === this.team1Id ? 0 : 1,
                    ":matchPlayed": 1
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
                UpdateExpression: `ADD #matchWon :matchWon, #matchLose :matchLose, #matchPlayed :matchPlayed`,
                ExpressionAttributeNames: {
                    "#matchWon": "matchWon",
                    "#matchLose": "matchLose",
                    "#matchPlayed": "matchPlayed"
                },
                ExpressionAttributeValues: {
                    ":matchWon": this.winner === this.team2Id ? 1 : 0,
                    ":matchLose": this.winner === this.team2Id ? 0 : 1,
                    ":matchPlayed": 1
                }
            };


            //debugger
            console.log(`update2Params: ${JSON.stringify(update2Params)}`);

            const [udpate2Err, update2Resp] = await put(updateParams);

            if (udpate2Err) throw udpate2Err;

        } else {
            this.currentSet += 1;
        };
    };

    getMatchState() {
        return {
            matchId: this.matchId,
            team1Set1Score: this.team1Set1Score,
            team1Set2Score: this.team2Set1Score,
            team1Set2Score: this.team1Set2Score,
            team2Set2Score: this.team2Set2Score,
            team1Set3Score: this.team1Set3Score,
            team2Set3Score: this.team2Set3Score,
            team1SetScore: this.team1SetScore,
            team2SetScore: this.team2SetScore,
            undoHistory: this.undoHistory,
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
            set1winner: this.set1winner,
            set2winner: this.set2winner,
            set3winner: this.set3winner,
            currentSet: this.currentSet,
        };
    }
}