const { ROLES } = require("libs/roleValidator/lambdaPolicies.js");



class PostSignUpService {

    constructor(repository) {

        this.repository = repository;
    };


    async fetchVersion() {
        try {

            const [fetch_err, fetch_succ] = await this.repository.getVersion();

            if (fetch_err) throw fetch_err;

            console.log(`fetch_succ: ${JSON.stringify(fetch_succ)}`);

            if (!Object.keys(fetch_succ).length || !fetch_succ.isActive)
                throw new Error("No active techday version");

            return [null, fetch_succ];

        } catch (error) {

            console.log(`Error in getTechdayVersion: ${JSON.stringify(error)}`);

            return [error];
        };
    };


    async updateLastLogin(id) {
        try {

            const [err, succ] = await this.repository.updateLogin(id);

            if (err) throw err;

            return [null, succ];

        } catch (error) {

            console.log(`Error: ${JSON.stringify(error)}`);

            return [error];
        };
    };


    async fetchUserVersion(id, version) {
        try {

            const [fetchErr, fetchSucc] = await this.repository.fetchVUser(id, version);

            if (fetchErr) throw fetchErr;

            return [null, fetchSucc];

        } catch (error) {

            console.log(`Error: ${JSON.stringify(error)}`);

            return [null];
        };
    };


    async createUserVersion(id, version) {
        try {

            const [createErr, createResp] = await this.repository.createUserVersion(id, version);

            if (createErr) throw createErr;

            return [null, createResp];

        } catch (error) {

            return [error];
        };
    };


    async addRole(email) {
        try {

            const superAdmin = [];

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

    async checkAndCreateUse(id) {
        try {

            const [fetchErr, fetchResp] = await this.fetchVersion();

            if (fetchErr) throw fetchErr;

            console.log({ fetchResp });

            // fetch user verison
            const [getUserErr, getUserResp] = await this.fetchUserVersion(id, fetchResp.version);

            if (getUserErr) throw getUserErr;

            console.log({ getUserResp });

            if (!Object.keys(getUserResp).length) {

                const [createErr, createResp] = await this.createUserVersion(id, fetchResp.version);

                if (createErr) throw createErr;

                console.log({ createResp });
            };

            return [null, "Signup SuccessFull"]

        } catch (error) {

            return [error];
        };
    }
};


module.exports = {

    PostSignUpService
};