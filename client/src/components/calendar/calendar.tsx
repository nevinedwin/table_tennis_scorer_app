import React, { useState } from 'react'
import Calendar from 'react-calendar';
import './calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

type ValueType = Date | null;

type Value = ValueType | [ValueType, ValueType];

interface CalendarWrapperProps {
    isOpen?: boolean;
    onClose?: () => void;
}

const CalendarWrapper: React.FC<CalendarWrapperProps> = ({ onClose }) => {

    const [value, setValue] = useState<Value>(new Date());
    const [activeStartDate, setActiveStartDate] = useState<Date>(new Date());

    const handleChange = (newValue: Value) => {

        setValue(newValue);
    }

    const handleActiveStartDate = ({ activeStartDate }: { activeStartDate: Date | null; }) => {
        if (activeStartDate) {
            setActiveStartDate(activeStartDate);
        };
    };

    const handleToday = () => {
        const today = new Date()
        setValue(today);
        setActiveStartDate(today)
        if (onClose) {
            onClose()
        };
    };

    return (
        <div className={`bg-backgroundLight dark:bg-secondary-dark !important rounded-[16px]  box-border lg:p-0 p-[16px]`}>
            <div>
                <Calendar
                    prevLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                    nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                    value={value}
                    prev2Label={null}
                    onChange={handleChange}
                    activeStartDate={activeStartDate}
                    onActiveStartDateChange={handleActiveStartDate}
                    next2Label={null}
                    showNeighboringMonth={false}
                    tileClassName={({ date, view }) => {
                        if (view === 'month' && value instanceof Date) {
                            if (date.toDateString() === value.toDateString()) {
                                return 'red-background'
                            }
                        }
                        return '';
                    }}
                    className={`bg-backgroundLight dark:bg-secondary-dark`}
                    view='month'
                    minDetail='month'
                />
            </div>
            <div className={` flex items-center h-[48px] px-[16px]`}>
                <div className={`bg-primary h-[4px] w-[8px] mr-[8px] rounded-[2px]`}></div>
                <span className={`text-left text-2sm dark:text-backgroundLight`}>Select Day for view matches and pin the match</span>
            </div>
            <div className={` xl:p-[16px] lg:p-[12px] border-t-[1px] border-t-bordersColor p-[12px] flex justify-between items-center`}>
                <button onClick={handleToday} className={`
                    text-light hover:text-secondary text-2sm
                    outline-none box-border cursor-pointer align-middle 
                    relative whitespace-nowrap z-1 rounded-[24px]
                    p-[4px_12px] 
                    border-[1.5px] border-primary
                    bg-primary hover:bg-primary-light hover:border-primary-light 
                    shadow-sm hover:shadow-md  transition-all duration-200 ease-in-out
                    `}>
                    Today
                </button>

                <button onClick={handleToday} className={`
                    text-light hover:text-secondary text-2sm
                    outline-none box-border cursor-pointer align-middle 
                    relative whitespace-nowrap z-1 rounded-[24px]
                    p-[7px_12px] 
                    border-[1.5px] border-primary
                    bg-primary hover:bg-primary-light hover:border-primary-light 
                    shadow-sm hover:shadow-md  transition-all duration-200 ease-in-out
                    `}>
                    go to date
                </button>
            </div>
        </div>
    )
}

export default CalendarWrapper;