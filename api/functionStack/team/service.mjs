import { failure, success } from "libs/response-lib/index.mjs";

export class TeamService {


    constructor(repository) {

        this.repository = repository;
    }


    async create(data, user) {

        try {

            const [err, createdBy] = await this.repository.getUser(user);

            if (err || !createdBy) throw err;


            // find player in any team already
            const [findingErr, isAleaready] = await this.repository.findPlayerAlreadyInTeam(data.player1Email);


            if (findingErr) throw findingErr;

            if (isAleaready) throw `The Player ${data.player1Email} already exsits in another team` ;


            const [findingErr2, isAleaready2] = await this.repository.findPlayerAlreadyInTeam(data.player2Email);

            if (findingErr2) throw findingErr2;

            if (isAleaready2) throw `The Player ${data.player2Email} already exsits in another team`;


            // store data 
            const [writeErr, writeSucc] = await this.repository.create({ ...data, createdBy });

            if (writeErr) throw writeErr;

            return success(writeSucc);

        } catch (error) {

            // debugger
            console.log(`Error in service: ${JSON.stringify(error)}`);

            return failure(error)
        }
    };

}