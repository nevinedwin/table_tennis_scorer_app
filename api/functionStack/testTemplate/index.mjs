import { failure, success } from 'libs/response-lib/index.mjs'


export const main = async (event) => {
    try {
        console.log(`Event: ${JSON.stringify(event)}`);
        console.log("Eneterd the lambda");
        return success("Hi data sucess")
    } catch (error) {
        return failure("Error in lambda")
    };
};