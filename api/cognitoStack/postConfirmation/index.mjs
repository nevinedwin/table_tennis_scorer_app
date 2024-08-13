// const { PostSignUpRepository } = require("./repository");
// const { PostSignUpService } = require("./service");
const { ROLES } = require("libs/roleValidator/lambdaPolicies.js");


const { TABLE_NAME } = process.env;

export async function main(event) {

    try {

        // const repo = new PostSignUpRepository(TABLE_NAME, event.userPoolId, event.userName)

        // const service = new PostSignUpService(repo);

        console.log(`Event: ${JSON.stringify(event)}`);

        const {
            request: {
                userAttributes: { email, sub: id, name },
            },
        } = event;


        // add role
        // const [roleErr, role] = await service.addRole(email);

        // if (roleErr) throw roleErr;

        // // add user
        // const [userErr, userResp] = await service.createUser({ role, email, id, name });

        // if (userErr) throw userErr;

        // console.log({ role, userResp });

        // if (role === ROLES.SUPER_ADMIN) return event;

        // const [createErr, createSucc] = await service.checkAndCreateUse(id);

        // console.log({ createSucc });

        // if (createErr) throw createErr;

    } catch (error) {

        console.log(`error: ${JSON.stringify(error)}`);

        throw error;
    };

    return event;
};

