import React from 'react'

type InputElementPropType = {
    placeholder: string,
    value?: string,
    setData: (data: (prev: Record<string, any>) => Record<string, any>) => void;
    name: string;
    type?: any;
}

const InputElement: React.FC<InputElementPropType> = ({ placeholder, name, setData, value, type = "text" }) => {


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    };

    return (
        <div className='flex items-center justify-center w-full gap-2'>
            <input id=''
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={(e) => handleChange(e)}
                className='w-full p-2 rounded-sm
                        outline-none border-2 border-borderColor bg-black
                        transition-all duration-300 ease-custom
                        text-white   focus:border-white
                          hover:border-white text-sm lg:text-2md
                        placeholder-gray-400'
            />
        </div>
    )
};

export default InputElement