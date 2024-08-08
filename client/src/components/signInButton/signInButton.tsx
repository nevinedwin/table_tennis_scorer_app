import React from 'react';

type SignInButtonProps = {
    handleClick: () => void;
    text: string;
};


const SignInButton: React.FC<SignInButtonProps> = ({ handleClick, text }) => {

    return (
        <button onClick={handleClick}
            className="w-[200px] h-[50px] bg-black text-white font-semibold rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
            {text}
        </button>

    );
};

export default SignInButton;
