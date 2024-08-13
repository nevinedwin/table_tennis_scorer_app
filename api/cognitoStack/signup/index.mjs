

export async function handler(event) {

    try {

        const superAdmins = ["nevin.e@inapp.com", "abhijeeth@inapp.com", "ben.ss@inapp.com"];

        console.log(`Event: ${JSON.stringify(event)}`);

        const { email } = event.request.userAttributes;

        const ourDomain = "inapp.com";

        const userEmailDomain = email.split("@")[1];

        if (userEmailDomain !== ourDomain) throw new Error("Invalid Email domain");

        return event;

    } catch (error) {

        console.log(`Error: ${JSON.stringify(error)}`);

        throw error;
    };

};



