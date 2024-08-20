import React from 'react'

type StyledButtonPropsType = {
    title: string;
    handleClick: () => void;
};

const StyledButton: React.FC<StyledButtonPropsType> = ({ title, handleClick }) => {
    return (
        <button
            onClick={handleClick}
            className={`bg-white w-[150px] p-2 text-black uppercase font-semibold rounded-md transition-bg-border duration-300 ease-custom text-center
                    hover:bg-black hover:text-white hover:border-white border-[1px]
                    focus:bg-black focus:text-white focus:border-white

                `}>
            {title}
        </button>
    )
}

export default StyledButton