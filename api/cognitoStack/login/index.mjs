// const { PostLoginRepository } = require("./repository");
// const { PostLoginService } = require("./service");
const { ROLES } = require("libs/roleValidator/lambdaPolicies.js");


const { TABLE_NAME } = process.env;


export async function handler(event) {
    try {

        const superAdmins = ["nevin.e@inapp.com", "abhijeeth@inapp.com", "ben.ss@inapp.com"];

        // const repository = new PostLoginRepository(TABLE_NAME);
        // const service = new PostLoginService(repository);

        console.log(`event: ${JSON.stringify(event)}`);

        const { sub: id, email } = event.request.userAttributes;

        const OurDomain = "inapp.com";

        const userEmailDomain = email.split("@")[1];

        if (userEmailDomain !== OurDomain) throw new Error({ statusCode: 500, message: "Authentication Failed, Use InApp Email for Login" });

        return event;

    } catch (error) {

        console.log(`Error: ${JSON.stringify(error)}`);

        throw error;
    };
};
