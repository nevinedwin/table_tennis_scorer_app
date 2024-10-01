import { PostSignUpRepository } from "./repository.mjs";
import { PostSignUpService } from "./service.mjs";


const { TABLE_NAME } = process.env;

export async function main(event) {

    try {

        const repo = new PostSignUpRepository(TABLE_NAME, event.userPoolId, event.userName)

        const service = new PostSignUpService(repo);

        console.log(`Event: ${JSON.stringify(event)}`);

        const {
            request: {
                userAttributes: { email, sub: id, name },
            },
        } = event;


        // add role
        const [roleErr, role] = await service.addRole(email);

        if (roleErr) throw roleErr;

        // add user
        const [userErr, userResp] = await service.createUser({ role, email, id, name, userName: event.userName });

        if (userErr) throw userErr;

        console.log({ role, userResp });

    } catch (error) {

        console.log(`error: ${JSON.stringify(error)}`);

        throw error;
    };

    return event;
};

