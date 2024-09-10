import React, { memo, useEffect, useState } from 'react'
import { TeamType } from '../../services/teamService';


type LogoForPlayerPropTypes = {
    letter: string
}


const LogoForPlayer: React.FC<LogoForPlayerPropTypes> = ({ letter }) => {
    return (
        <div className='w-[25px] h-[25px] p-1 rounded-full border-secondary-dark border-2 text-center text-white flex justify-center items-center'>
            <p className='text-xs lg:text-sm uppercase font-bold'>{letter?.slice(0, 2)}</p>
        </div>
    )
};


type PoolTablePropTypes = {
    data: TeamType[],
    pool: string;
    isLoading: boolean;
}

const PoolTable: React.FC<PoolTablePropTypes> = ({ data, pool, isLoading }) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    }, []);


    return (
        <div className={`w-full p-1 lg:p-4 transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
            <table className='w-[100%] '>
                <colgroup>
                    <col className='w-[40%] lg:w-[30%]' />
                    <col className='w-[30%]' />
                    <col width="5%" />
                    <col width="5%" />
                    <col width="5%" />
                    <col width="5%" />
                </colgroup>
                <thead >
                    <tr className={`h-10 ${pool === 'A' ? 'bg-primary' : pool === 'B' ? 'bg-primary' : 'bg-primary'} font-bold text-lg lg:text-xl border-b-[1px] border-borderColor`} >
                        <th colSpan={6} className='pl-4 text-center uppercase'>POOL {pool}</th>
                    </tr>
                    <tr className={`h-10  font-bold text-lg lg:text-xl ${pool === 'A' ? 'bg-primary' : pool === 'B' ? 'bg-primary' : 'bg-primary'} border-b-[7px] border-black`}>
                        <th className='p-2 pl-8 text-start '>Team</th>
                        <th className='lg:p-2 text-start'>Player's</th>
                        <th className='p-2 text-start'>M</th>
                        <th className='p-2 text-start'>W</th>
                        <th className='p-2 text-start'>L</th>
                        <th className='p-2 text-start'>P</th>
                    </tr>
                </thead>
                <tbody className=''>

                    {data?.length ?
                        data.map((eachData, index) => (
                            <tr key={index} className=' h-10 bg-borderColor text-white text-md lg:text-lg border-b-[7px] border-black' >
                                <td className='uppercase flex justify-start items-center gap-2 p-2 lg:p-4'>
                                    <div>{index + 1}</div>
                                    <div className=''>
                                        <LogoForPlayer letter={eachData?.teamName?.slice(0, 3) as string} />
                                    </div>
                                    <div className='text-sm lg:text-lg'>{eachData.teamName}</div>
                                </td>
                                <td className='text-sm lg:text-lg '>
                                    <div>{eachData.player1Name}</div>
                                    <div>{eachData.player2Name}</div>
                                </td>
                                <td className='p-2 lg:p-4'>{eachData.matchPlayed}</td>
                                <td className='p-2 lg:p-4'>{eachData.matchWon}</td>
                                <td className='p-2 lg:p-4'>{eachData.matchLose}</td>
                                <td className='p-2 lg:p-4'>{eachData.point}</td>
                            </tr>
                        ))
                        :
                        <tr>
                            {isLoading ?
                                <td colSpan={7} className='text-center'>
                                    <div className="relative w-full h-1 bg-transparent overflow-hidden mx-auto">
                                        <div className="absolute top-0 left-0 w-full h-full bg-white animate-line-move"></div>
                                    </div>
                                </td>
                                :
                                <td colSpan={7} className="text-center">
                                    <div className="flex items-center justify-center h-40">
                                        <div className=" rounded-lg shadow-lg">
                                            <p className="text-white text-xxl font-semibold animate-pulse">No Data Available</p>
                                        </div>
                                    </div>
                                </td>
                            }
                        </tr>

                    }
                </tbody>
            </table>
        </div>
    )
}

export default memo(PoolTable);