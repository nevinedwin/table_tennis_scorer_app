import React from 'react';
import GoogleLoginButton from '../../components/loginComponent/googleAuth';

const LoginPage: React.FC = () => {

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-light to-secondary-light">
      <div className="absolute inset-0 z-0 animate-background-wave">
        <div className="absolute inset-0 bg-pattern opacity-50"></div>
      </div>
      <div className="absolute inset-0 z-10 flex justify-center items-center px-4">
        <div className="bg-transparent rounded-lg p-8 w-full max-w-md">
          <h1 className="lg:text-3xl font-bold mb-4 text-center animate-bounce text-secondary-dark">
            Table Tennis Tournament
          </h1>
          <p className="text-secondary mb-8 text-center animate-pulse">
            "The true beauty of table tennis lies in its simplicity and the
            endless possibilities it holds."
          </p>
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;