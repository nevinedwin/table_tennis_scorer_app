import React from 'react';
import { MatchType } from '../../hooks/apiHooks/useMatchApi';


type ToggelButtonPropTypes = {
    isFalseState: string;
    isTruthState: string;
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<Partial<MatchType>>> | React.Dispatch<React.SetStateAction<any>>;
    name: string;
    id?: string;
    toggledId?: string;
}

const ToggleButton: React.FC<ToggelButtonPropTypes> = ({ isFalseState, isTruthState, setToggle, toggle = false, name, id, toggledId }) => {

    const handleToggle = () => {
        setToggle(prev => ({
            ...prev,
            [name]: !toggle,
            ...(id && { id })
        }));
    };

    return (
        <label className="flex items-center cursor-pointer">
            <div className="mr-3 text-white text-md lg:text-xl">{isFalseState}</div>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={toggledId === id ? toggle : false}
                    onChange={handleToggle}
                />
                <div
                    className={`block w-12 lg:w-14 lg:h-8 h-6 border-[1px] rounded-full ${toggle ? 'bg-white' : 'bg-black border-white'
                        }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 ${toggle ? 'bg-black' : 'bg-white'} w-4 lg:w-6 h-4 lg:h-6 rounded-full transition-transform duration-300 ease-in-out ${toggle ? 'transform translate-x-6' : ''
                        }`}
                ></div>
            </div>
            <div className="ml-3 text-white text-md lg:text-xl">{isTruthState}</div>
        </label>
    );
};

export default ToggleButton;