import React from 'react'

type StyledButtonPropsType = {
    title: string;
    handleClick: () => void;
    isError?: boolean;
    setButtonClicked?: React.Dispatch<React.SetStateAction<boolean>>;
    classes?: string;
    width?: string;
};

const StyledButton: React.FC<StyledButtonPropsType> = ({ title, handleClick, isError = false, classes = "", width = "" }) => {
    return (
        <button
            onClick={handleClick}
            className={`p-2 text-white uppercase  font-semibold rounded-md lg:text-2md text-sm transition-bg-border duration-300 ease-custom text-center border-primary
                    ${isError ? 'bg-primary' : classes ? classes : 'bg-primary hover:bg-bgColor hover:text-white hover:border-white border-[1px]'}
                    ${width ? `w-[${width}]` : `w-[150px]`}

                `}>
            {title}
        </button>
    )
}

export default StyledButton