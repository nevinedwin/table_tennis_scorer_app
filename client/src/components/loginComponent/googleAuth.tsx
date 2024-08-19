import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuth } from '../../context/authContext/authContext';
import { signIn } from '../../services/loginServices';
import { signOut } from 'aws-amplify/auth';


const GoogleLoginButton: React.FC = () => {

    const { state: { error: signInError } } = useAuth()

    const handleLogin = () => {
        try {
            signIn()
        } catch (error) {
            console.log(error);
        };
    };



    return (
        <>
            <button
                onClick={handleLogin}
                className="flex justify-center items-center bg-primary hover:bg-primary-light text-light font-medium rounded-lg py-2 px-4 w-full animate-bounce"
            >
                <FontAwesomeIcon icon={faGoogle} className="mr-2 text-2xl" />
                Sign in with Google
            </button>
            {signInError && <div className={`text-[14px] text-primary`}>{signInError}</div>}

            <button onClick={()=>signOut()}
            className="flex justify-center items-center bg-primary hover:bg-primary-light text-light font-medium rounded-lg py-2 px-4 w-full animate-bounce"
            
                >
                    sign out
            </button>
        </>
    );
};

export default GoogleLoginButton;