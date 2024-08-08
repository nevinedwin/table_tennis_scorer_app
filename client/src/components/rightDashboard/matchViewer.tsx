import React from 'react';
import { IMatch } from '../../sampleData/match_data';
import { formatDate, formatTime } from '../../utilities/common';


type MatchViewerPropType = {
    matchData: IMatch
}

const MatchViewer: React.FC<MatchViewerPropType> = ({ matchData }) => {

    return (
        <div className={`flex items-center justify-between h-[150px] lg:h-[96px] xl:p-[8px_12px] lg:p-[8px_30px] p-[10px_40px]`}>
            <div className='h-[100%] pt-[25px] lg:pt-0'>
                <div className={`flex items-center flex-row`}>
                    <div className='flex justify-center xl:min-w-[120px] relative'>
                        <img src="" alt="" className='w-[39px] xl:w-[48px] h-[39px] xl:h-[48px] object-cover border-none' />
                        <div className='absolute bottom-[-22px] left-[50%] translate-x-[-50%] flex items-center flex-col'>
                            <bdi className='xl:max-w-[120px] w-[80px] xl:text-[14px] text-[12px] text-center  font-bold uppercase text-ellipsis overflow-x-clip whitespace-nowrap min-w-0'>{matchData?.teams?.team_1?.teamName}</bdi>
                        </div>
                        <div className='absolute bottom-[-38px] left-[50%] translate-x-[-50%] flex items-center flex-col'>
                            <bdi className='xl:max-w-[120px] xl:text-[12px] text-[11px] font-bold text-ellipsis overflow-x-clip whitespace-nowrap min-w-0'>{matchData?.teams?.team_1?.player_1?.fname} - {matchData?.teams?.team_1?.player_2?.fname}</bdi>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`mt-[-8px]`}>
                <div className={`flex justify-center items-center flex-col w-[100%]`}>
                    <div className='box-border'>
                        <div className={`relative text-center`}>
                            {matchData?.matchStatus === "Not_Started" ?
                                <span className={`text-left xl:text-[16px] text-[14px]  font-bold text-secondary text-ellipsis whitespace-nowrap overflow-x-clip min-w-0`}>
                                    {formatDate(matchData?.matchDate)}
                                </span>
                                :
                                <span className={`text-left xl:text-[14px] text-[12px] font-bold text-secondary text-ellipsis whitespace-nowrap overflow-x-clip min-w-0`}>
                                    <span className={`relative text-left text-[28px] ${(matchData?.teams?.team_1?.setsWin ?? 0) > (matchData?.teams?.team_2?.setsWin ?? 0) ? 'text-secondary-dark' : 'text-secondary-light'} font-bold text-ellipsis whitespace-nowrap overflow-x-clip min-w-0`}>{matchData?.teams?.team_1?.setsWin}</span>
                                    <span className={`text-left font-bold text-[28px] text-secondary-light text-ellipsis whitespace-nowrap overflow-x-clip min-w-0`}>-</span>
                                    <span className={`relative text-left text-[28px] ${(matchData?.teams?.team_1?.setsWin ?? 0) < (matchData?.teams?.team_2?.setsWin ?? 0) ? 'text-secondary-dark' : 'text-secondary-light'} font-bold text-ellipsis whitespace-nowrap overflow-x-clip min-w-0`}>{matchData?.teams?.team_2?.setsWin}</span>
                                </span>}
                        </div>
                        <div className={`block`}>
                            {matchData?.matchStatus === "Not_Started" ? <span className={`pl-[5px] relative text-center text-[12px] font-normal text-secondary-light overflow-hidden`}>{formatTime(matchData?.matchDate)}</span> : <span className={`relative text-center ${matchData?.matchStatus === "Live" ? 'pl-[8px] text-primary font-extrabold' : 'text-secondary-light '} font-normal  overflow-hidden`}>{matchData?.matchStatus}</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='h-[100%] pt-[25px] lg:pt-0'>
                <div className={`flex items-center flex-row`}>
                    <div className='flex justify-center xl:min-w-[120px] relative'>
                        <img src="" alt="" className='w-[39px] xl:w-[48px] h-[39px] xl:h-[48px]  object-cover border-none' />
                        <div className='absolute bottom-[-22px] left-[50%] translate-x-[-50%] flex items-center flex-col'>
                            <bdi className='xl:max-w-[120px] xl:text-[14px] text-[12px] font-bold uppercase text-ellipsis overflow-x-clip whitespace-nowrap min-w-0'>{matchData?.teams?.team_2?.teamName}</bdi>
                        </div>
                        <div className='absolute bottom-[-38px] left-[50%] translate-x-[-50%] flex items-center flex-col'>
                            <bdi className='xl:max-w-[120px] xl:text-[12px] text-[11px] font-bold text-ellipsis overflow-x-clip whitespace-nowrap min-w-0'>{matchData?.teams?.team_2?.player_1?.fname} - {matchData?.teams?.team_2?.player_2?.fname}</bdi>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchViewer