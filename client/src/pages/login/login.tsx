import React, { useEffect } from 'react';
import GoogleLoginButton from '../../components/loginComponent/googleAuth';
import { useAuth } from '../../context/authContext/authContext';
import ManageLocalStorage, { localStorageKeys } from '../../utilities/ManageLocalStorage';
import khelLogo from '../../assets/Khel_Logo.svg'; 
import loginbg from '../../assets/login-bg.png'

const { isLoading: isLoadingKey } = localStorageKeys;

const LoginPage: React.FC = () => {
  const { state: { user } } = useAuth();

  useEffect(() => {
    ManageLocalStorage.delete(isLoadingKey);
  }, [user]);

  const isLoading = ManageLocalStorage.get(isLoadingKey);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${loginbg})`}}>
      {isLoading && (
        <div className="relative w-full h-1 bg-transparent overflow-hidden mx-auto">
          <div className="absolute top-0 left-0 w-full h-full bg-primary animate-line-move"></div>
        </div>
      )}
   
      <div className="absolute inset-0 z-10 flex justify-center items-center px-4">
       <div className="bg-gray-900 rounded-lg p-8  w-80 h-auto shadow-lg border border-white">
          <div className="flex flex-col items-center mb-6">
            <img src={khelLogo} alt="Khel Logo" className="w-32 mb-2" />
            <p className="text-gray-400 text-sm">Fuel Your Game, Stay Connected!</p>
          </div>
          <div className='w-full'>
            <GoogleLoginButton isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;