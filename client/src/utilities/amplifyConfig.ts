import { Amplify } from 'aws-amplify';
import { AmplifyConfigType } from '../context/amplifyContext/amplifyContextType';

export default function setConfigAmplify(config: AmplifyConfigType) {

    Amplify.configure({
        Auth: {
            Cognito: {
                userPoolId: config.cognito.USER_POOL_ID,
                userPoolClientId: config.cognito.APP_CLIENT_ID,
                signUpVerificationMethod: "code",
                loginWith: {
                    oauth: {
                        domain: config.cognito.DOMAIN,
                        scopes: ['email', 'profile', 'openid'],
                        redirectSignIn: config.cognito.SIGN_IN_URL, // or your app's URL
                        redirectSignOut: config.cognito.SIGN_OUT_URL, // or your app's URL
                        responseType: 'code',
                        providers: ["Google"]
                    }
                }
            }
        }
    });
    
    return true;
};