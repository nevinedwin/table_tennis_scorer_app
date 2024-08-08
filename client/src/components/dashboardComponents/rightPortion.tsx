import React from 'react'
import VottingSection from '../rightDashboard/vottingSection'
import Details from '../rightDashboard/details';
import { IMatch } from '../../sampleData/match_data';
import MatchViewer from '../rightDashboard/matchViewer';
import { NavigationType } from '../../pages/dashboard/dashboard';


type RightPortionTypes = {
    matchData: IMatch;
    setIsMatchDetailOpen: (isOpen: boolean) => void;
    navigation: NavigationType,
    handleNavigation: (nav: NavigationType) => void;
    handleVoted: (isVote: boolean) => void;
    isVoted: boolean;
}

const RightPortion: React.FC<RightPortionTypes> = ({ matchData, setIsMatchDetailOpen, navigation, handleNavigation, handleVoted, isVoted }) => {

    const handleNav = (item: NavigationType): void => {
        handleNavigation(item)
    };

    const handleDetailClose = () => {
        setIsMatchDetailOpen(false)
    }

    return (
        <div className={`overflow-hidden bg-backgroundLight h-[100%] rounded-none lg:rounded-[16px] lg:shadow-[0_1px_4px_] lg:shadow-boxShadowLightColor pb-[16px] text-secondary`}>
            <div className={`p-[14px_16px_6px] text-left font-bold text-secondary text-[16px] flex justify-between lg:block`}>
                Match {matchData?.MatchNumber}
                <button onClick={handleDetailClose} className='lg:hidden bg-primary hover:bg-primary-light px-[10px] rounded-[4px] text-[12px] text-light'>
                    dashboard
                </button>
            </div>
            <div className={`bg-backgroundLightColor min-h-[102px] m-[8px_8px_16px] rounded-[8px]`}>
                <div className={`lg:rounded-[16px] lg:pt-[8px] lg:pb-[8px`}>
                    <MatchViewer matchData={matchData} />
                </div>

            </div>
            {/* show more button */}
            {/* <div className={`table m-[0px_auto_12px]`}>
                <button className={`outline-none box-border cursor-pointer whitespace-nowrap relative z-1 p-[8px_16px] rounded-[24px] 
                    uppercase tracking-[0.5px] font-semibold bg-primary hover:bg-primary-light text-light hover:text-secondary-light`}>
                    Show more
                </button>
            </div> */}
            {/* area before match */}
            <div className={`pt-[8px] pl-[8px] pr-[8px]`}>
                {/* navigation */}
                <div className={`transition ease-in-out duration-500 translate-x-0 translate-y-0 z-3 static p-0`}>
                    <div className='overflow-hidden relative'>
                        <div className='w-[100%] relative flex overflow-hidden whitespace-nowrap'>
                            <div onClick={() => handleNav('details')} className={`inline-block my-0 mx-0 cursor-pointer flex-1 
                                text-center font-medium text-[14px] 
                                uppercase p-4 transition-opacity text-primary
                                duration-500 ease-linear border-b-2 ${navigation === 'details' ? 'border-primary  opacity-100' : 'border-transparent  opacity-60'}`}>
                                Details
                            </div>
                            <div onClick={() => handleNav('prediction')} className={`inline-block my-0 mx-0 cursor-pointer flex-1 
                                text-center font-medium text-[14px] 
                                uppercase p-4 transition-opacity text-primary
                                duration-200 ease-linear border-b-2 ${navigation === 'prediction' ? 'border-primary  opacity-100' : 'border-transparent  opacity-60'}`}>
                                Prediction
                            </div>
                        </div>
                    </div>

                </div>
                {/* polling */}
                {navigation === "details" ?
                    <>
                        <Details matchData={matchData} />
                    </>
                    :
                    <>
                        <VottingSection isVoted={isVoted} handleVoted={handleVoted}/>
                    </>
                }
            </div>
            <div>

            </div>

        </div>
    )
}

export default RightPortion