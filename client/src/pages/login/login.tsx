import React, { useEffect } from 'react';
import GoogleLoginButton from '../../components/loginComponent/googleAuth';
import { useAuth } from '../../context/authContext/authContext';
import ManageLocalStorage, { localStorageKeys } from '../../utilities/ManageLocalStorage';

const { isLoading: isLoadingKey } = localStorageKeys;

const LoginPage: React.FC = () => {

  const { state: { user } } = useAuth();

  useEffect(() => {
    if (user) {
      ManageLocalStorage.delete(isLoadingKey);
    }
  }, [user])

  const isLoading = ManageLocalStorage.get(isLoadingKey);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {isLoading && <div className="relative w-full h-1 bg-transparent overflow-hidden mx-auto">
        <div className="absolute top-0 left-0 w-full h-full bg-primary animate-line-move"></div>
      </div>}
      <div className="absolute inset-0 z-0 animate-background-wave">
        <div className="absolute inset-0 bg-pattern opacity-50"></div>
      </div>
      <div className="absolute inset-0 z-10 flex justify-center items-center px-4">
        <div className="bg-transparent rounded-lg p-8 w-full ">
          <h1 className="lg:text-5xl text-4xl font-bold mb-4 text-center animate-bounce text-white">
            PING PONG '<sup>24</sup>
          </h1>
          <h4 className='text-white text-center text-xl lg:text-3xl '>
            Inter&mdash;Project Table Tennis Doubles Tournament
          </h4>
          {/* <p className="text-white mb-8 text-center animate-pulse">
            "The true beauty of table tennis lies in its simplicity and the
            endless possibilities it holds."
          </p> */}
          <div className='flex items-center justify-center mt-8'>
            <div className='w-[400px] h-[50px]'>
              <GoogleLoginButton isLoading={isLoading}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;