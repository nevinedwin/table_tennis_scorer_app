import React, { memo } from 'react'
import InputElement from '../inputElement/inputElement'
import StyledButton from '../button/button'
import { MatchType } from '../../services/matchService';
import SearchInput from '../searchInput/searchInput';
import CalendarInput from '../datePicker/datePicket';
import ToggleButton from '../toggleButton/toggleButton';



type MatchFormPropType = {
    matchData: Partial<MatchType>;
    setMatchData: React.Dispatch<React.SetStateAction<Partial<MatchType>>>;
    handleCreate: () => void;
    errorData: string;
    isError: boolean;
    isbuttonClicked: boolean;
    setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
    setForSearchInput: React.Dispatch<React.SetStateAction<boolean>>;
    isSuccess: boolean;
    buttonTitle?: string;
    forSearchInput:boolean;
};

const MatchForm: React.FC<MatchFormPropType> = ({ matchData, setMatchData, handleCreate, isSuccess, isError, errorData, buttonTitle = "Create Match", setButtonClicked , forSearchInput, setForSearchInput}) => {


    return (
        <div className='w-full rounded-md p-8 mt-8 border-[1px] border-borderColor'>

            <div className='flex w-full'>
                <div className='flex-1'>
                    <div className='w-[150px]'>
                        <p className='text-xl mb-2'>Match No.</p>
                        <InputElement placeholder='Match No.' name='matchNumber' setData={setMatchData} value={matchData?.matchNumber || ""} />
                    </div>
                </div>
                <div className='flex-1 flex justify-center items-center flex-col'>
                    <p className='text-xl mb-2'>Voting</p>
                    <div className='flex items-center justify-center'>
                        <ToggleButton isFalseState='OFF' isTruthState='ON' name='votingStarted' setToggle={setMatchData} toggle={matchData?.votingStarted || false} />
                    </div>
                </div>
            </div>

            <p className='mt-8 mb-2'>Playing Teams</p>
            <div className='flex items-center justify-between'>
                <div className='flex-1 mr-3'>
                    <SearchInput placeholder='Team 1' name='team1Id' setData={setMatchData} value={matchData.team1Id} isButtonClicked={forSearchInput} setForSearchInput={setForSearchInput}/>
                </div>
                <div>vs</div>
                <div className='flex-1 ml-3'>
                    <SearchInput placeholder='Team 2' name='team2Id' setData={setMatchData} value={matchData.team2Id} isButtonClicked={forSearchInput} setForSearchInput={setForSearchInput}/>
                </div>
            </div>

            <p className='text-xl mb-2 mt-8'>Schedule Match</p>
            <div className='flex items-center justify-between'>
                <div className='flex-1 mr-3'>
                    <CalendarInput selectedDate={matchData?.date ? new Date(matchData.date) : null} setSelectedDate={setMatchData} name='date' />
                </div>
            </div>

            {isError &&
                <p className='text-primary text-2md text-center pt-8'>{errorData}</p>
            }
            {isSuccess &&
                <p className='text-green text-2md text-center pt-8'>Successfully created</p>
            }
            <div className={`mt-10 flex justify-center items-center w-full`}>
                <StyledButton handleClick={handleCreate} title={buttonTitle} isError={isError} setButtonClicked={setButtonClicked} />
            </div>
        </div>
    )
}

export default memo(MatchForm)