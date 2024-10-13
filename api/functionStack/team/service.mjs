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

            if (isAleaready) throw `The Player ${data.player1Email} already exsits in another team`;


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


    async list() {
        try {

            // query all users
            const [err, users] = await this.repository.listUser();

            if (err) throw err;

            const sortedData = this.repository.quickSortTeam(users.Items);

            //debugger
            console.log(`sortedData: ${JSON.stringify(sortedData)}`);

            return success(sortedData);

        } catch (error) {
            console.log(`Error in service: ${JSON.stringify(error)}`);
            return failure(error);
        };
    };


    async update(data) {
        try {

            //debugger
            console.log(`data: ${JSON.stringify(data)}`);

            const { id } = data;

            // delete the prev data
            const [delErr, delSucc] = await this.repository.deleteTeam(id)

            if (delErr) throw delErr;

            //debugger
            console.log(`delSucc: ${JSON.stringify(delSucc)}`);

            const [writeErr, writeSucc] = await this.repository.create(data);

            if (writeErr) throw writeErr;

            return success(writeSucc);

        } catch (error) {

            //debugger
            console.log(`Error in service: ${JSON.stringify(error)}`);
            return failure(error);

        };
    };


    async delete(data) {
        try {

            //debugger
            console.log(`data: ${JSON.stringify(data)}`);

            const { id } = data;

            // delete the prev data
            const [delErr, delSucc] = await this.repository.deleteTeam(id);

            if (delErr) throw delErr;

            return success({ status: true, data: `Deleted Successfully!. ${delSucc}` });

        } catch (error) {
            //debugger
            console.log(`Error in service: ${JSON.stringify(error)}`);
            return failure(error);
        };
    };


    async get(event) {
        try {
            const id = event?.pathParameters?.id ?? 0;

            console.log(`id: ${id}`);

            if (!id) return failure("Match Id is required");

            const [fetchErr, fetchSucc] = await this.repository.fetchTeam(id);

            if (fetchErr | !fetchSucc) throw fetchErr;

            // debugger
            console.log(`fetchSuccess: ${JSON.stringify(fetchSucc)}`);

            return success(fetchSucc?.Item || {});

        } catch (error) {
            // debugger
            console.log(`Error: ${JSON.stringify(error)}`);

            return failure(error);
        }
    };

    async updateSingle({updateKey, updateValue, teamId}) {
        try {

            if (!teamId && !updateKey && !updateValue) return failure("Team Id, UpdateKey and UpdateValue are required");

            const [updateErr, updateSucc] = await this.repository.updateSigleTeam({teamId, updateKey, updateValue});

            if (updateErr | !updateSucc) throw updateErr;

            // debugger
            console.log(`updateSuccess: ${JSON.stringify(updateSucc)}`);

            return success(`updated ${updateKey} = ${updateValue}`);

        } catch (error) {
            // debugger
            console.log(`Error: ${JSON.stringify(error)}`);

            return failure(error);
        }
    };
}