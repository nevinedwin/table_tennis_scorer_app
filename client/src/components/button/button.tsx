import React from 'react'

type StyledButtonPropsType = {
    title: string;
    handleClick: () => void;
    isError?: boolean;
    setButtonClicked?: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledButton: React.FC<StyledButtonPropsType> = ({ title, handleClick, isError = false }) => {
    return (
        <button
            onClick={handleClick}
            className={`w-[150px] p-2 text-black uppercase  font-semibold rounded-md transition-bg-border duration-300 ease-custom text-center
                    ${isError ? 'bg-primary' : 'bg-white hover:bg-black hover:text-white hover:border-white border-[1px]'}

                `}>
            {title}
        </button>
    )
}

export default StyledButton