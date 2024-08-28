import React, { useState } from 'react';
import { MatchType } from '../../services/matchService';


type ToggelButtonPropTypes = {
    isFalseState: string;
    isTruthState: string;
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<Partial<MatchType>>> | React.Dispatch<React.SetStateAction<any>>;
    name: string
}

const ToggleButton: React.FC<ToggelButtonPropTypes> = ({ isFalseState, isTruthState, setToggle, toggle = false, name }) => {

    const handleToggle = () => {
        setToggle(prev => ({
            ...prev,
            [name]: !toggle
        }));
    };

    return (
        <label className="flex items-center cursor-pointer">
            <div className="mr-3 text-white  font-xl">{isFalseState}</div>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={toggle}
                    onChange={handleToggle}
                />
                <div
                    className={`block w-14 h-8 border-[1px] rounded-full ${toggle ? 'bg-white' : 'bg-black border-white'
                        }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 ${toggle ? 'bg-black' : 'bg-white'} w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${toggle ? 'transform translate-x-6' : ''
                        }`}
                ></div>
            </div>
            <div className="ml-3 text-white font-xl">{isTruthState}</div>
        </label>
    );
};

export default ToggleButton;