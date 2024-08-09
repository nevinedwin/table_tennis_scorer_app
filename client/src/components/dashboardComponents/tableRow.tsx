import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import { IMatch } from '../../sampleData/match_data';
import { formatDate, formatTime } from '../../utilities/common';
import ttImg from '../../assets/tt_bat.jpg';
import { NavigationType } from '../../pages/dashboard/dashboard';

type TableRowPropsType = {
    matchData: IMatch;
    setMatchDetails: (match: IMatch) => void;
    setIsMatchDetailOpen: (isDetailOpen: boolean) => void;
    navigation: NavigationType,
    handleNavigation: (nav: NavigationType) => void;
    isVoted: boolean;
}

const TableRow: React.FC<TableRowPropsType> = ({ matchData, setMatchDetails, setIsMatchDetailOpen, handleNavigation, isVoted }) => {

    const [isTeamName, setIsTeamName] = useState(true);

    const getTableLeftSection = (): [string, string] => {
        const date = matchData?.matchDate;
        if (matchData?.matchStatus !== "Not_Started") {
            return [formatTime(date), matchData?.matchStatus];
        };
        return [formatDate(date), formatTime(date)];
    };

    const getPlayerNames = (isTeamName: boolean = true): [string, string] => {
        const team_1 = matchData?.teams?.team_1
        const team_2 = matchData?.teams?.team_2
        const player1 = `${team_1.player_1.fname} / ${team_1?.player_2.fname}`
        const player2 = `${team_2.player_1.fname} / ${team_2?.player_2.fname}`
        if (!isTeamName) {
            return [player1, player2]
        };

        return [team_1.teamName, team_2.teamName];
    };

    const handleMatchClick = (navOption: NavigationType) => {
        setMatchDetails(matchData)
        setIsMatchDetailOpen(true)
        handleNavigation(navOption);
    };

    return (
        <div className="box-border mb-[4px] hover:bg-backgroundLightColor dark:hover:bg-secondary-light dark:text-backgroundLight cursor-pointer">
            <div className="h-[80px] lg:h-[48px] flex items-center">
                <div className="mx-[8px] text-center flex-[0_0_56px]">
                    <bdi className="text-left text-[14px] lg:text-[12px] font-[400]">{getTableLeftSection()[0]}</bdi>
                    <div className="relative overflow-hidden flex items-center flex-col h-[17px] min-w-[16px]">
                        <bdi className="w-[56px] text-center text-[12px] font-[400] text-ellipsis overflow-x-clip whitespace-nowrap min-w-0">{getTableLeftSection()[1]}</bdi>
                    </div>
                </div>
                <div className="bg-bordersColor dark:bg-primary h-[50px] lg:h-[40px] mr-[8px] flex-[0_0_1px]"></div>
                <div onClick={() => handleMatchClick('details')} className="overflow-x-clip min-w-0 flex-grow">
                    <div className="flex items-center">
                        <div className="overflow-x-clip min-w-0 flex-[1_1_140px] ">
                            <div className="flex items-center mb-[2px]" onClick={() => setIsTeamName((prev) => !prev)}>
                                <div className="h-[16px] w-[16px] mr-[8px]">
                                    <img src={ttImg} alt="" className="rounded-[50%] object-cover border-none" />
                                </div>
                                <bdi className="text-left text-[14px] text-ellipsis overflow-x-clip whitespace-nowrap min-w-0">{getPlayerNames(isTeamName)[0]}</bdi>
                            </div>
                            <div className="flex items-center mb-[2px]" onClick={() => setIsTeamName((prev) => !prev)}>
                                <div className="h-[16px] w-[16px] mr-[8px]">
                                    <img src={ttImg} alt="" className="rounded-[50%] object-cover border-none" />
                                </div>
                                <bdi className="text-left text-[14px] text-ellipsis overflow-x-clip whitespace-nowrap min-w-0">{getPlayerNames(isTeamName)[1]}</bdi>
                            </div>
                            <div></div>
                        </div>
                        <div className="flex-[0_1_auto] hidden xl:block">
                            {matchData?.matchStatus !== "Not_Started" &&
                                <>
                                    <div className="flex h-[16px] mb-[2px]">
                                        {Object.keys(matchData?.sets).map((eachSet, index) => (
                                            <div key={index} className="inline-block relative w-[24px] text-right">
                                                <div className="relative border-[1px] border-transparent overflow-hidden flex items-start flex-col h-[22px] lg:h-[17px] w-[24px] min-w-[16px]">
                                                    <span className="text-center text-[14px]">{matchData?.sets[eachSet]?.team_1}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex h-[16px] mb-[2px]">
                                        {Object.keys(matchData?.sets).map((eachSet, index) => (
                                            <div key={index} className="inline-block relative w-[24px] text-right">
                                                <div className="relative border-[1px] border-transparent overflow-hidden flex items-start flex-col h-[22px] lg:h-[17px] w-[24px] min-w-[16px]">
                                                    <span className="text-center text-[14px]">{matchData?.sets[eachSet]?.team_2}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            }
                        </div>
                        <div className={`flex items-end justify-end flex-col relative w-[38px] mr-[8px]`}>
                            {matchData?.matchStatus !== "Not_Started" &&
                                <>
                                    <div className={`relative border-[1px] border-transparent overflow-hidden flex items-end flex-col h-[22px] lg:h-[17px] min-w-[16px]`}>
                                        <span className={`min-w-[16px] relative text-[14px] text-right`}>{matchData?.teams?.team_1?.setsWin}</span>
                                    </div>
                                    <div className={`relative border-[1px] border-transparent overflow-hidden flex items-end flex-col h-[22px] lg:h-[17px] min-w-[16px]`}>
                                        <span className={`min-w-[16px] relative text-[14px] text-right`}>{matchData?.teams?.team_2?.setsWin}</span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-bordersColor dark:bg-primary  h-[50px] lg:h-[40px] mr-[10px] flex-[0_0_1px]"></div>
                <div className={`mr-[12px] flex-[0_1_auto] flex items-center justify-center flex-col`}>
                    <button className={`w-[20px] h-[20px]`}>

                        <FontAwesomeIcon onClick={() => handleMatchClick('prediction')} icon={faSquarePollVertical} className={`w-full h-full text-primary dark:text-backgroundLight ${isVoted ? 'text-secondary' : ''}`} />

                    </button>
                    {isVoted && <span className='text-[10px]'>Voted</span>}
                </div>
            </div>
        </div>
    );
};

export default TableRow;
