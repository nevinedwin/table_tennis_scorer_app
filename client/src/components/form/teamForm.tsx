import React from 'react'
import InputElement from '../inputElement/inputElement'
import StyledButton from '../button/button'
import { TeamType } from '../../hooks/apiHooks/useTeamApi';

type TeamFormPropType = {
    teamdata: Partial<TeamType>;
    setTeamData: React.Dispatch<React.SetStateAction<Partial<TeamType>>>;
    handleCreate: () => void;
    errorData: string;
    isError: boolean;
    isbuttonClicked: boolean;
    setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
    isSuccess: boolean;
    buttonTitle?: string;
};

const TeamForm: React.FC<TeamFormPropType> = ({ teamdata, setTeamData, handleCreate, isError, errorData, setButtonClicked, isSuccess, buttonTitle = 'Create Team' }) => {


    return (
        <div className='w-full rounded-md p-4 lg:p-8 mt-8 border-[1px] border-borderColor'>
            <div className='flex items-start justify-center flex-col w-full gap-2'>
                <p className='text-sm lg:text-2md uppercase'>Team Name</p>
                <InputElement placeholder='Type your tame name here' value={teamdata.teamName} setData={setTeamData} name="teamName" />
            </div>
            <div className='pt-4 flex items-start justify-center flex-col w-full gap-2'>
                <p className='text-sm lg:text-2md uppercase'>Pool</p>
                <InputElement placeholder='Type the pool where team exists' value={teamdata?.pool as string} setData={setTeamData} name="pool" />
            </div>
            
            {/* player details */}
            <div className='flex flex-col justify-center items-start mt-8 gap-3'>
                <p className='text-sm lg:text-2md uppercase'>Player Details</p>
                <div className='flex items-center justify-start gap-2 w-full'>
                    <InputElement placeholder='Type player1 name' value={teamdata.player1Name} setData={setTeamData} name='player1Name' />
                    <InputElement placeholder='Type player1 email' value={teamdata.player1Email} setData={setTeamData} name='player1Email' />
                </div>
                <div className='flex items-center justify-start gap-2 w-full'>
                    <InputElement placeholder='Type player2 name' value={teamdata.player2Name} setData={setTeamData} name='player2Name' />
                    <InputElement placeholder='Type player2 email' value={teamdata.player2Email} setData={setTeamData} name='player2Email' />
                </div>
            </div>
            {isError &&
                <p className='text-primary text-sm lg:text-2md text-center pt-8'>{errorData}</p>
            }
            {isSuccess &&
                <p className='text-green text-sm lg:text-2md text-center pt-8'>Successfully created</p>
            }
            <div className={`mt-10 flex justify-center items-center w-full`}>
                <StyledButton handleClick={handleCreate} title={buttonTitle} isError={isError} setButtonClicked={setButtonClicked} />
            </div>
        </div>
    )
}

export default TeamForm