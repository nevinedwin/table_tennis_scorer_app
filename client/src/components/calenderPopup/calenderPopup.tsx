import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import CalendarWrapper from '../calendar/calendar';

interface CalenderPopupProps {
    isOpen: boolean,
    onClose: () => void
}


const CalenderPopup: React.FC<CalenderPopupProps> = ({ isOpen, onClose }) => {

    if (!isOpen) return null;
    return (
        <div className={`fixed inset-0 bg-backgroundLightColor dark:bg-secondary-light bg-opacity-90 z-50 flex justify-center items-center p-[16px]`}>
            <div className={`bg-backgroundLight dark:bg-secondary-dark rounded-lg w-full max-w-md`}>
                <div onClick={onClose} className={`flex justify-end p-2 px-[20px]`}>
                    <button className={`text-primary hover:text-primary-light text-[20px]`}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
                <CalendarWrapper isOpen={isOpen} onClose={onClose}/>
            </div>

        </div>
    )
}

export default CalenderPopup;