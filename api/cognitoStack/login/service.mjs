

class PostLoginService {

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
};


module.exports = {

    PostLoginService
};