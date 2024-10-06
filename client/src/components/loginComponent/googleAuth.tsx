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
      <div className="flex justify-center w-full mt-8">
        <button
          onClick={handleLogin}
          className={`
          flex justify-center items-center font-medium rounded-lg py-3 px-4 w-full  
          text-lg
          ${isLoading
              ? `bg-primary text-white transition-all duration-100 ease-custom cursor-default`
              : `bg-primary text-white transition-all duration-100 ease-custom
               hover:border-[1px] hover:border-white hover:shadow-md`
            }
        `}
          disabled={isLoading}
        >
          {
            isLoading ?
              <>
                {/* Spinner */}
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-4 border-white mr-2"></div>
                <span>Signing in...</span>
              </>
              :
              <>
                <FontAwesomeIcon icon={faGoogle} className="mr-2 text-xl" />
                Sign in with Google
              </>
          }
        </button >
        {signInError && <div className={`text-[14px] text-primary`}>{signInError}</div>}

      </div >
    </>
  );
};

export default GoogleLoginButton;