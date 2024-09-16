


export const main = async (event) => {
    try {

        console.log(`Event: ${JSON.stringify(event)}`);

    } catch (error) {
        console.log(`Error: ${JSON.stringify(error)}`);
    };
};