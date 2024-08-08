import React, { useState } from 'react';

const ToggleButton: React.FC = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <label className="flex items-center cursor-pointer">
            <div className="mr-3 text-secondary dark:text-backgroundLight  font-medium">All</div>
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={isToggled}
                    onChange={handleToggle}
                />
                <div
                    className={`block w-14 h-8 border-[1px] rounded-full ${isToggled ? 'bg-primary' : 'bg-backgroundLightColor border-primary'
                        }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 ${isToggled ? 'bg-backgroundLightColor' : 'bg-primary'} w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${isToggled ? 'transform translate-x-6' : ''
                        }`}
                ></div>
            </div>
            <div className="ml-3 text-secondary dark:text-backgroundLight font-medium">Live</div>
        </label>
    );
};

export default ToggleButton;