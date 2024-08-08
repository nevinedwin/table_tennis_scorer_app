import React from 'react'
import ToggleButton from '../toggleButton/toggleButton'
import TableRow from './tableRow'
import { IMatch, Tournament } from '../../sampleData/match_data'
import TableRowHeader from './tableRowHeader'
import NoEventBoard from './noEventBoard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faDashboard } from '@fortawesome/free-solid-svg-icons'
import { NavigationType } from '../../pages/dashboard/dashboard'

type MiddlePortionPropType = {
    TournamentData: Tournament,
    isOpen: boolean;
    openCalender: () => void;
    setMatchDetails: (match: IMatch) => void;
    setIsMatchDetailOpen: (isDetailOpen: boolean) => void;
    navigation: NavigationType,
    handleNavigation: (nav: NavigationType) => void;
    isVoted: boolean;
}

const MiddlePortion: React.FC<MiddlePortionPropType> = ({ TournamentData, openCalender, setMatchDetails, setIsMatchDetailOpen, navigation, handleNavigation, isVoted }) => {

    return (
        <div className={`lg:rounded-[16px] lg:pb-[16px] bg-backgroundLight dark:bg-secondary-dark box-border h-full lg:shadow-[0_1px_4px_] lg:shadow-boxShadowLightColor `}>
            <div className={`flex items-center justify-between lg:pt-[16px] px-[16px] pt-[20px]`}>
                <div className={`block`}>
                    <ToggleButton />
                </div>
                <div onClick={openCalender} className='lg:hidden block'>
                    <FontAwesomeIcon icon={faCalendar} className='text-[25px] text-primary dark:text-primary-light hover:text-primary-light' />
                </div>
            </div>
            <div className={`lg:hidden flex items-center justify-start h-[40px] bg-backgroundLightColor dark:bg-secondary-light mt-[20px] pl-[14px] dark:text-backgroundLight`}>
                <FontAwesomeIcon icon={faDashboard} className='pr-[6px]' />
                12th August 2024
            </div>
            {Object.keys(TournamentData).length === 0 ?
                <>
                    <NoEventBoard />
                </> :
                <div className={`m-[8px] rounded-[16px] min-h-[400px]`}>
                    {Object.keys(TournamentData).map((eachTournament, index) => (
                        <div className='mt-[30px]' key={index}>
                            <TableRowHeader />
                            {TournamentData[eachTournament].map((eachMatch, i) => (
                                <TableRow matchData={eachMatch} key={i} setMatchDetails={setMatchDetails} setIsMatchDetailOpen={setIsMatchDetailOpen} navigation={navigation} handleNavigation={handleNavigation} isVoted={isVoted}/>
                            ))}
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default MiddlePortion