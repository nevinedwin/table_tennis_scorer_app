import React, { useState } from 'react'

type VottingSectionPropType = {
    isVoted: boolean;
    handleVoted: (isVote: boolean) => void;
}

const VottingSection: React.FC<VottingSectionPropType> = ({isVoted, handleVoted}) => {

    const [isVotedTeam, setIsVotedTeam] = useState<1 | 2 | null>(null);
    const [votingEnded, setVotingEnded] = useState<boolean>(false);

    const team = {
        team1: 30,
        team2: 70
    }

    const handleClick = (teamName: string, teamNumber: 1 | 2) => {
        if (!votingEnded && !isVoted) {
            handleVoted(true);
            setIsVotedTeam(teamNumber)
            console.log(teamName);
        }
    };

    console.log(isVoted, votingEnded, `w-[${team.team1}%]`);


    return (
        <div className={`bg-backgroundLightColor relative mt-[8px] mb-[8px] rounded-[16px] text-center cursor-default`}>
            <div className='box-border'>
                <div className={`flex justify-center flex-col items-center pt-[8px] ${isVoted ? 'mb-0' : 'mb-[38px]'}`}>
                    <div className={`flex justify-center mr-[8px] ml-[8px]`}>
                        <span className={`text-left font-bold text-[16px] text-secondary mt-[8px] `}>Who Will Win?</span>
                    </div>
                    {/* display after voting */}
                    <span className={`${isVoted || votingEnded ? 'block' : 'hidden'} text-left font-medium text-[12px] text-secondary  mb-[8px]`}>Total Votes: 169</span>
                </div>

                <div className={`relative w-[100%] mt-[12px] pl-[8px] pr-[8px] box-border`}>
                    {/* polling tile */}
                    <div className={`flex justify-center flex-col pb-[16px] w-full`}>
                        <div className='flex w-full'>
                            <div onClick={() => handleClick("team1", 1)} className={`min-w-[2.2%] ${isVoted || votingEnded ? `w-[${team.team1}%] !important` : 'w-full !important'} h-[30px] m-[0px_1px] ${isVoted ? 'rounded-none' : 'rounded-[4px]'} `}>
                                <div className={`flex items-center h-[100%] bg-primary ${isVoted || votingEnded ? 'rounded-none cursor-default' : 'rounded-[4px] cursor-pointer'}`}>
                                    <div className={`w-[100%] text-light text-center font-bold text-[14px] ${isVoted || votingEnded ? 'rounded-none' : 'rounded-[4px]'}`}>{isVoted || votingEnded ? `${team.team1}%` : "Team_1"}</div>
                                </div>
                            </div>
                            <div onClick={() => handleClick("team_2", 2)} className={`${isVoted || votingEnded ? `w-[${team.team2}%] ` : 'w-[100%]'} h-[30px] m-[0px_1px] ${isVoted ? 'rounded-none' : 'rounded-[4px]'} min-w-[2.2%]`}>
                                <div className={`flex items-center cursor-pointer h-[100%] bg-secondary ${isVoted || votingEnded ? 'rounded-none cursor-default' : 'rounded-[4px] cursor-pointer'}`}>
                                    <div className={`w-[100%] text-light text-center font-bold text-[14px] ${isVoted || votingEnded ? 'rounded-none' : 'rounded-[4px]'}`}>{isVoted || votingEnded ? `${team.team2}%` : "Team_2"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`pb-[12px] px-[8px] text-left flex justify-between items-center`}>
                        <div className={`${isVotedTeam && isVotedTeam === 1 ? 'text-primary' : 'text-secondary'} font-semibold text-[12px] flex gap-1 items-center`}>
                            {isVoted ? <>
                                <div className={`w-[10px] inline-block h-[10px] rounded-[50%] ${isVotedTeam && isVotedTeam === 1 ? 'bg-primary' : 'bg-secondary'}`}></div>
                                <div className='inline-block'>Your vote</div>
                            </> :
                                votingEnded && <div className='inline-block'>Not voted</div>}
                        </div>
                        {votingEnded ?
                            <span className={`text-secondary-light font-semibold xl:text-[12px] text-[11px]`}>
                                Voting Ended
                            </span> :
                            <span className={`text-secondary-light font-semibold xl:text-[12px] text-[11px]`}>
                                Your prediction, your game - cast your vote!
                            </span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VottingSection