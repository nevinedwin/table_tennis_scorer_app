import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import CalendarWrapper from "../../components/calendar/calendar";
import MiddlePortion from "../../components/dashboardComponents/middlePortion";
import RightPortion from "../../components/dashboardComponents/rightPortion";
import { IMatch, matchData, Tournament } from "../../sampleData/match_data";
import CalenderPopup from "../../components/calenderPopup/calenderPopup";
import NoMatchSelected from "../../components/rightDashboard/noMatchSelected";

export type NavigationType = 'details' | 'prediction';

const Dashboard: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isMatchDetailOpen, setIsMatchDetailsOpen] = useState(false);
    const [matchDetails, setMatchDetails] = useState<IMatch | null>(null)
    const [navigation, setNavigation] = useState<NavigationType>('details');
    const [isVoted, setIsVoted] = useState<boolean>(false)

    const tounanements: Tournament = matchData;


    const handleSetMatchDetails = (match: IMatch) => {
        setMatchDetails(match);
    };

    const handleIsMatchDetailsOpen = (isOpen: boolean) => {
        setIsMatchDetailsOpen(isOpen);
    }

    const handleNavigation = (option: NavigationType) => {
        setNavigation(option)
    }

    const handleVoted = (isVote: boolean) => {
        setIsVoted(isVote);
    };


    return (
        <div className="min-h-screen  lg:bg-backgroundLightColor bg-backgroundLight  dark:bg-secondary">
            {/* Navbar */}
            <div className={`h-[80px]`}>
                <Navbar />
            </div>
            <main className={`block pb-[52px] lg:pb-0`}>
                <div className={`xl:w-[1344px] lg:w-[992px] h-full mx-auto max-w-[100%]`}>
                    {/* <ul className={`p-[12px_0px] inline-flex items-center list-none overflow-x-hidden w-[100% box-border]`}></ul> */}
                    <div className={`flex box-border lg:flex-row flex-col lg:p-[12px_0px] p-0 h-full`}>
                        <CalenderPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
                        {!isOpen && <div className={` hidden lg:w-[0px] flex-[3_1_auto] lg:block`}>
                            <div className={`rounder-[16px]`}>
                                <CalendarWrapper />
                            </div>
                        </div>}
                        <div className={`${isMatchDetailOpen ? 'hidden lg:block' : 'block'} lg:ml-[24px] lg:w-[0px] flex-[5_1_auto] lg:min-h-[500px] h-full`} >
                            <MiddlePortion
                                TournamentData={tounanements}
                                openCalender={() => setIsOpen(true)}
                                isOpen={isOpen}
                                setMatchDetails={handleSetMatchDetails}
                                setIsMatchDetailOpen={handleIsMatchDetailsOpen}
                                navigation={navigation}
                                handleNavigation={handleNavigation}
                                isVoted={isVoted}
                            />
                        </div>
                        <div className={`${isMatchDetailOpen ? 'block' : 'hidden'} lg:ml-[24px] lg:w-[0px] flex-[4_1_auto] lg:block lg:min-h-[500px] lg:h-[500px] h-full`}>
                            {matchDetails === null
                                ?
                                <div className="overflow-hidden bg-backgroundLightColor h-[100%] rounded-[16px] shadow-[0_1px_4px_] shadow-boxShadowLightColor pb-[16px] text-secondary">
                                    <>
                                        <NoMatchSelected />
                                    </>
                                </div>
                                :
                                <RightPortion matchData={matchDetails} setIsMatchDetailOpen={handleIsMatchDetailsOpen} navigation={navigation} handleNavigation={handleNavigation} isVoted={isVoted} handleVoted={handleVoted} />
                            }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
