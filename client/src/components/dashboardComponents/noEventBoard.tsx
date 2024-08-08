import React from 'react';
import noEventImg from '../../assets/no_event.png';

const NoEventBoard: React.FC = () => {
    return (
        <div className={`flex items-center justify-center flex-col p-[32px] box-border`}>
            <div className={`h-[100px] w-[100px] mb-[16px]`}>
                <img src={noEventImg} alt=""  className='w-[100px] h-[100px] object-cover'/>
            </div>
            <span className={`font-bold text-[16px, 20px] space-[-0.2px] text-secondary`}>No Events</span>
            <span className={`font-normal text-[14px] text-center mt-[8px] text-secondary-light`} >Try Selecting a different date on the calendar</span>
        </div>
    )
}

export default NoEventBoard