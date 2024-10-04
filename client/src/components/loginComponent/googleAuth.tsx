import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAuth } from '../../context/authContext/authContext';
import { signIn } from '../../services/loginServices';
import ManageLocalStorage, { localStorageKeys } from '../../utilities/ManageLocalStorage';

const { isLoading: isLoadingKey } = localStorageKeys;

type GoogleLoginButtonTypeProp = {
    isLoading?: any;
};

const GoogleLoginButton: React.FC<GoogleLoginButtonTypeProp> = ({ isLoading }) => {

    const { state: { error: signInError } } = useAuth()

    const handleLogin = () => {
        try {
            ManageLocalStorage.set(isLoadingKey, 'true');
            signIn()
        } catch (error) {
            console.log(error);
        };
    };



    return (
        <>
     <div className="flex justify-center w-full">
      <button
        onClick={handleLogin}
        className={`
          flex justify-center items-center font-medium rounded-3xl py-2 px-4 
          w-3/4 text-lg
          ${isLoading 
            ? `bg-gray-500 cursor-default` 
            : `bg-blue-600 text-white transition-all duration-300 ease-custom
               hover:bg-blue-700 hover:shadow-md`
          }
        `}
        disabled={isLoading}
      >
        <FontAwesomeIcon icon={faGoogle} className="mr-2 text-xl" />
        Sign in with Google
      </button>
      {signInError && <div className={`text-[14px] text-primary`}>{signInError}</div>}

    </div>
        </>
    );
};

export default GoogleLoginButton;