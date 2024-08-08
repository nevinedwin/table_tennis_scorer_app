import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../config';
import { useSendGoogleResponse } from '../../hooks/queryHooks/useUserQuery';
import { useAuth } from '../../context/authContext/authContext';
import { AUTH_ACTIONS, User, UserRole } from '../../context/authContext/authContextTypes';


const GoogleLoginButton: React.FC = () => {

    const { dispatch, state: { error: signInError } } = useAuth()

    // post api for google signIn 
    const { mutate: sendGoogleResp } = useSendGoogleResponse();

    const checkIsValidEmail = (email: string): boolean => {
        const emailSplit = email.split('@');
        if (emailSplit[1] === "inapp.com") return true;
        return false;
    };

    const handleGoogleLogin = async () => {
        try {

            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);



            const result = await signInWithPopup(auth, provider);

            const isContinue = checkIsValidEmail(result.user.email as string);

            if (isContinue) {

                const body = {
                    displayName: result?.user?.displayName || "",
                    email: result?.user?.email || "",
                    photoUrl: result?.user?.photoURL || ""
                };

                sendGoogleResp(body, {
                    onSuccess: (data: any) => {

                        const { user } = data.data;

                        const userData: User = {
                            role: user?.role as UserRole,
                            userId: user.userId,
                            displayName: user.displayName,
                            email: user.email,
                            image: user.image,
                            predictionWinScore: user.predictionWinScore,
                            predictionLoseScore: user.predictionLoseScore,
                            totalPredictions: user.totalPredictions,
                            teamId: user?.teamId || "",
                            token: user?.token
                        };

                        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userData });
                    },
                    onError: (err) => {
                        throw err;
                    }
                });


            } else {

                dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: "SignIn Failed! Use InApp Email for signIn" });
            };

        } catch (error) {
            console.log(`Could not login with google`, error);
        };
    };

    return (
        <>
            <button
                onClick={handleGoogleLogin}
                className="flex justify-center items-center bg-primary hover:bg-primary-light text-light font-medium rounded-lg py-2 px-4 w-full animate-bounce"
            >
                <FontAwesomeIcon icon={faGoogle} className="mr-2 text-2xl" />
                Sign in with Google
            </button>
            {signInError && <div className={`text-[14px] text-primary`}>{signInError}</div>}
        </>
    );
};

export default GoogleLoginButton;