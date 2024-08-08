import React from 'react';
import ttImg from '../../assets/tt_bat.jpg';

const TableRowHeader: React.FC = () => {
    return (
        <div className='box-border mb-[4px]'>
            <div className={`flex items-center pl-[24px]`}>
                <div className={`h-[30px] w-[30px]`}>
                    <img src={ttImg} alt="" className={`rounded-[50%] object-cover border-none box-border w-full h-full`} />
                </div>
                <div className={`flex flex-col justify-center flex-[1_0_0px] h-[48px] ml-[24px] mr-[12px] text-[14px] dark:text-backgroundLight`}>
                    <div className={`cursor-pointer`}>Tournament name</div>
                    <div>Tournament Details</div>
                </div>
                <div className={`bg-bordersColor h-[40px] w-[1px] mr-[12px] dark:bg-primary`}></div>
            </div>
        </div>
    )
}

export default TableRowHeader