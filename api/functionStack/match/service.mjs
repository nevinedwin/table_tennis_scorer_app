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

            if(err) throw err;

            // create set for matches
            const [set1Err, set1Resp] = await this.repository.createSetForMatches(matchId, 1)
            if(set1Err) throw set1Err;

            const [set2Err, set2Resp] = await this.repository.createSetForMatches(matchId, 2)
            if(set2Err) throw set2Err

            const [set3Err, set3Resp] = await this.repository.createSetForMatches(matchId, 3)
            if(set3Err) throw set3Err

            return success("Successfully created Match");

        } catch (error) {
            //debugger
            console.log(`Error in service: ${JSON.stringify(error)}`);
            return failure(error);
        };
    };

};