import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuth } from '../../context/authContext/authContext';


const GoogleLoginButton: React.FC = () => {

    const { state: { error: signInError } } = useAuth()


    return (
        <>
            <button
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