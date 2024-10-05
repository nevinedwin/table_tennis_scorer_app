import React, { SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css'; // Importing custom styles
import { MatchType } from '../../hooks/apiHooks/useMatchApi';

type CalendarInputProps = {
    selectedDate: Date | null;
    setSelectedDate: React.Dispatch<SetStateAction<Partial<MatchType>>>;
    placeholder?: string;
    name?: string;
};

const CalendarInput: React.FC<CalendarInputProps> = ({ selectedDate, setSelectedDate, placeholder = "Select Date", name }) => {

    const handleDate = (date: any) => {
        setSelectedDate(prev => ({
            ...prev,
            [name as string]: date.toString()
        }))
    };


    return (
        <div className="relative">
            <DatePicker
                selected={selectedDate instanceof Date && !isNaN(selectedDate.getTime()) ? selectedDate : null}
                onChange={(e) => handleDate(e)}
                className="w-full p-3 rounded-md bg-bgColor border border-borderColor text-white 
                           placeholder-gray-400 focus:border-white hover:border-white transition-all duration-300"
                placeholderText={placeholder}
                dateFormat="MMMM d, yyyy h:mm aa" // Display date and time
                showTimeSelect
                timeFormat="h:mm aa" // 12-hour time format with AM/PM
                timeIntervals={15} // Allow time selection in 15-minute intervals
                timeCaption="Time" // Label for time picker
                showPopperArrow={false} // Removes the popper arrow
                calendarClassName="custom-calendar"
            />
        </div>
    );
};

export default CalendarInput;
