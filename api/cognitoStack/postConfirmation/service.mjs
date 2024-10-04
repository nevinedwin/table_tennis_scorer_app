import { ROLES } from "libs/roleValidator/lambdaPolicies.mjs";



export class PostSignUpService {

    constructor(repository) {

        this.repository = repository;
    };

    async addRole(email) {
        try {

            const superAdmin = ["nevin.e@inapp.com", "abhijeeth@inapp.com", "ben.ss@inapp.com", "prabhuraj.pl@inapp.com"];

            const isSuperAdmin = superAdmin.includes(email) ? true : false;

            const role = isSuperAdmin ? ROLES.SUPER_ADMIN : ROLES.USER;

            const [err, resp] = await this.repository.updateRole(role);

            console.log({ resp });

            if (err) throw err;

            return [null, role];

        } catch (error) {

            return [null];
        };
    };


    async createUser(params) {
        try {

            const [err, resp] = await this.repository.adduser(params);

            if (err) throw err;

            return [null, resp];

        } catch (error) {

            return [error];
        };
    };
};