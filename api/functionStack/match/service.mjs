import { failure, success } from "libs/response-lib/index.mjs";

export class MatchService {


    constructor(repository) {

        this.repository = repository;
    }


    async create(data) {

        try {

            //debugger
            console.log(`data: ${JSON.stringify(data)}`);

            const [err, matchId] = await this.repository.createMatch(data);

            if (err) throw err;

            // create set for matches
            const [set1Err, set1Resp] = await this.repository.createSetForMatches(matchId, 1)
            if (set1Err) throw set1Err;

            const [set2Err, set2Resp] = await this.repository.createSetForMatches(matchId, 2)
            if (set2Err) throw set2Err

            const [set3Err, set3Resp] = await this.repository.createSetForMatches(matchId, 3)
            if (set3Err) throw set3Err

            return success("Successfully created Match");

        } catch (error) {
            //debugger
            console.log(`Error in service: ${JSON.stringify(error)}`);
            return failure(error);
        };
    };


    async list() {
        try {

            // fetch matches;
            const [fetchMatchesErr, fetchMatches] = await this.repository.listMatches();

            if (fetchMatchesErr) throw fetchMatchesErr;

            const matchList = fetchMatches?.Items || [];

            if (!matchList.length) {
                return success([]);
            };


            // list sets
            const [fetchMatchSetsErr, fetchMatchSets] = await this.repository.listMatchSets();

            if (fetchMatchSetsErr) throw fetchMatchSetsErr;

            const matchSets = fetchMatchSets?.Items || [];

            // list teams
            const [fetchTeamsErr, fetchTeams] = await this.repository.listTeam();

            if (fetchTeamsErr) throw fetchTeamsErr;

            const teamList = fetchTeams?.Items || [];

            const result = this.repository.combineListDatas(matchList, matchSets, teamList);

            return success(result);

        } catch (error) {
            //debugger
            console.log(`Error in service: ${JSON.stringify(error)}`);
            return failure(error);
        }
    };


    async get(event) {

        try {

            const id = event?.pathParameters?.id ?? 0;

            console.log(`id: ${id}`);

            if (!id) return failure("Match Id is required");

            const [fetchErr, fetchSucc] = await this.repository.fetchMatch(id);

            if (fetchErr | !fetchSucc) throw fetchErr;

            // debugger
            console.log(`fetchSuccess: ${JSON.stringify(fetchSucc)}`);

            return success(fetchSucc?.Items[0] || {});

        } catch (error) {

            // debugger
            console.log(`Error: ${JSON.stringify(error)}`);

            return failure(error);

        };
    };


    async editMatch(data) {
        try {
            const [udpateErr, updateData] = await this.repository.createMatch(data);

            if (udpateErr) throw udpateErr;

            return success(updateData);

        } catch (error) {
            //debugger
            console.log(`Error in service: ${JSON.stringify(error)}`);
            return failure(error);
        };
    };

    async deleteMatch(data) {
        try {

            console.log({ data });

            const { id } = data;

            const [delErr, delSucc] = await this.repository.deleteMatch(id);

            if (delErr) throw delErr;

            const [set1Err] = await this.repository.deleteSets(id, 1);
            if (set1Err) throw set1Err;
            //debugger
            console.log(`dadv:`);

            const [set2Err] = await this.repository.deleteSets(id, 2);
            if (set2Err) throw set2Err;
            console.log("object");

            const [set3Err] = await this.repository.deleteSets(id, 3);
            if (set3Err) throw set3Err;
            console.log("objectds");

            return success("Successfully Deleted");

        } catch (error) {
            //debugger
            console.log(`Error in service: ${JSON.stringify(error)}`);
            return failure(error);
        }
    }


    async addVote(data, userId) {
        try {
            const { teamId, matchId } = data;

            // get Match
            const [getErr, getResp] = await this.repository.getMatch(matchId);

            if (getErr) throw getErr;

            const matchData = getResp.Item;

            // check voting started
            if (!matchData.votingStarted) throw "Voting is not started yet. Please wait!"

            // check the user already voted
            // get the voting data
            const [getVoteErr, getVoteResp] = await this.repository.getUserBasedVoting(userId, matchId);

            if (getVoteErr) throw getVoteErr;

            if (Object.keys(getVoteResp).length) throw "Already Voted..";

            // create user vote

            const [voteErr, VoteResp] = await this.repository.createUserVote(userId, matchId, teamId);

            if (voteErr) throw voteErr;

            //debugger
            console.log(`teamId: ${JSON.stringify(teamId)}`);

            //debugger
            console.log(`matchData: ${JSON.stringify(matchData)}`);

            // find teamNumber
            let teamNumber;
            if (teamId === matchData.team1Id) {
                teamNumber = 1;
            } else if (teamId === matchData.team2Id) {
                teamNumber = 2;
            } else {
                throw "Team Id is wrong";
            };

            //debugger
            console.log(`teamNumber: ${JSON.stringify(teamNumber)}`);

            const [writeErr, writeResp] = await this.repository.updateMatchBasedOnVote(matchId, teamNumber);

            if (writeErr) throw writeErr;

            return success({ writeResp, matchId });

        } catch (error) {
            //debugger
            console.log(`Error in Service: ${JSON.stringify(error)}`);
            return failure(error);
        }
    };

    async getVote(data, userId) {
        try {

            const { matchId } = data;

            console.log(`MatchId: ${JSON.stringify(matchId)}`);

            const [err, resp] = await this.repository.getUserBasedVoting(userId, matchId);

            if (err) throw err;

            if (!Object.keys(resp).length) return success({ voted: false });

            const [getTeamErr, getTeam] = await this.repository.fetchTeam(resp.Item.votedTeamId)

            return success({ voted: true, teamName: getTeam.Item.teamName });

        } catch (error) {
            //debugger
            console.log(`Error in Service: ${JSON.stringify(error)}`);
            return failure(error);
        }
    };


    async getFullMatch(data) {
        try {

            const { matchId } = data;

            // get Match data
            const [err, matchData] = await this.repository.getMatch(matchId)

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
            const [matchSet1Err, matchSet1Data] = await this.repository.getMatchSet(matchId, 1);

            if (matchSet1Err) throw matchSet1Err;

            const [matchSet2Err, matchSet2Data] = await this.repository.getMatchSet(matchId, 2);

            if (matchSet2Err) throw matchSet2Err;

            const [matchSet3Err, matchSet3Data] = await this.repository.getMatchSet(matchId, 3);

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
            }


            return success(returnData);

        } catch (error) {
            //debugger
            console.log(`Error in Service: ${JSON.stringify(error)}`);

            return failure(error);
        };
    };

};