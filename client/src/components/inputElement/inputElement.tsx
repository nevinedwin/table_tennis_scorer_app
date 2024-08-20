import React from 'react'

type InputElementPropType = {
    placeholder: string,
    value?: string
}

const InputElement: React.FC<InputElementPropType> = ({ placeholder }) => {
    return (
        <div className='flex items-center justify-center w-full gap-2'>
            <input id=''
                type="text"
                placeholder={placeholder}
                className='w-full p-2 rounded-sm
                        outline-none border-2 border-borderColor bg-black
                        transition-all duration-300 ease-custom
                        text-white   focus:border-white
                          hover:border-white
                        placeholder-gray-400'
            />
        </div>
    )
};

export default InputElement