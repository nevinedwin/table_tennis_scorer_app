import React from 'react'

const NoMatchSelected: React.FC = () => {
    return (
        <div className={`flex items-center justify-center flex-col p-[32px] box-border h-full`}>
            <span className={`font-bold text-[16px, 20px] space-[-0.2px] text-secondary`}>No Live Matches</span>
            <span className={`font-normal text-[14px] text-center mt-[8px] text-secondary-light`} >Selecting a Match from the table for details</span>
        </div>
    )
}

export default NoMatchSelected