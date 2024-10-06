import React, { useEffect } from 'react';
import GoogleLoginButton from '../../components/loginComponent/googleAuth';
import { useAuth } from '../../context/authContext/authContext';
import ManageLocalStorage, { localStorageKeys } from '../../utilities/ManageLocalStorage';
import khelLogo from '../../assets/Khel_Logo.svg';
import loginbg from '../../assets/bg-login.svg'

const { isLoading: isLoadingKey } = localStorageKeys;

const LoginPage: React.FC = () => {
  const { state: { user } } = useAuth();

  useEffect(() => {
    ManageLocalStorage.delete(isLoadingKey);
  }, [user]);

  const isLoading = ManageLocalStorage.get(isLoadingKey);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${loginbg})` }}>
      {isLoading && (
        <div className="relative w-full h-1 bg-transparent overflow-hidden mx-auto">
          <div className="absolute top-0 left-0 w-full h-full bg-blueColor animate-line-move"></div>
        </div>
      )}

      <div className="absolute inset-0 z-10 flex justify-center items-center px-4">
        <div className="bg-cardBg rounded-lg p-8  w-80 lg:w-[500px] h-auto lg:h-[450px] shadow-lg border border-white flex items-center justify-center flex-col">
          <div className="flex flex-col items-center mb-6">
            <div className='flex items-center justify-center'>
              <img src={khelLogo} alt="Khel Logo" className="w-full h-full" />
            </div>
            <p className="text-white text-xl lg:text-xxl">Fuel Your Game, Stay Connected!</p>
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