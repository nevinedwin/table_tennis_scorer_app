import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuth } from '../../context/authContext/authContext';
import { signIn } from '../../services/loginServices';


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
                className={`flex h-full justify-center items-center bg-primary text-light font-medium rounded-lg py-2 px-4 w-full text-xl
                        transition-bg-border duration-300 ease-custom
                        hover:bg-black hover:border-white hover:border-[1px]
                     `}>
                <FontAwesomeIcon icon={faGoogle} className="mr-2 text-2xl" />
                Sign in with Google
            </button>
            {signInError && <div className={`text-[14px] text-primary`}>{signInError}</div>}
        </>
    );
};

export default GoogleLoginButton;