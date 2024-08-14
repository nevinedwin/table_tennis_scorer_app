import { getCurrentUser, signInWithRedirect } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils";




export const signIn = () => {
    try {
        signInWithRedirect({ provider: "Google" });
    } catch (error) {
        console.log(error);
        throw error;
    };
};

export const getUser = async () => {
    try {
        return await getCurrentUser();
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};


export const AuthenticationListener = (): any => {
    const subscribe = Hub.listen("auth", async ({ payload }) => {
        console.log("object", payload);
        switch (payload.event) {
            case "signInWithRedirect":
                const user = await getCurrentUser();
                console.log(user);
                break;
            case "signInWithRedirect_failure":
                // handle sign in failure
                break;
            case "customOAuthState":
                const state = payload.data; // this will be customState provided on signInWithRedirect function
                console.log(state);
                break;
        }
    });;

    return subscribe;
};