
export async function handler(event) {
    try {

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
