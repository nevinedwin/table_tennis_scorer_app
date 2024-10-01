import { failure, success } from "libs/response-lib/index.mjs";

export class UserService {


    constructor(repository) {

        this.repository = repository;
    }


    async getUser(event) {
        try {

            const id = event?.pathParameters?.id ?? 0;

            if (!id) return failure("user Id is required");

            const [fetchErr, fetchSucc] = await this.repository.fetchUser(id);

            if (fetchErr | !fetchSucc) throw fetchErr;

            // debugger
            console.log(`fetchSuccess: ${JSON.stringify(fetchSucc)}`);

            return success(fetchSucc);

        } catch (error) {

            // debugger
            console.log(`Error: ${JSON.stringify(error)}`);

            return failure(error);

        };
    };

    async changeRole(data) {
        try {
            console.log(`Data: ${data}`);

            const { userId, role, userName } = data;

            if (!userId || !role) {
                throw "UserId or Role is missing";
            }

            const [changeRole, err] = this.repository.updateUser({ id: userId, updateValue: role, updateKey: "role", userName });

            if (err) throw err;

            //debugger
            console.log(`changeRole: ${JSON.stringify(changeRole)}`);

            return success(data);
        } catch (error) {
            return failure(error);
        };
    }

}