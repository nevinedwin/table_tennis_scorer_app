import React, { memo, useCallback, useEffect, useState } from "react";
import Hoc from "../../components/hoc/hoc";
import Heading from "../../components/dashboard/heading";
import Matchpaper from "../../components/paper/matchpaper";
import { quickSort } from "../../utilities/common";
import LiveBoard from "../../components/dashboard/liveBoard";
import { useSocket } from "../../context/websocketContext/websocketContext";
import useMatchApi, { MatchListType } from "../../hooks/apiHooks/useMatchApi";

export type NavigationType = 'details' | 'prediction';

const Dashboard: React.FC = () => {

    const { listMatch, getFullMatch, updateMatchSingle } = useMatchApi();
    const { newMessage } = useSocket()

    const [matches, setMatches] = useState<MatchListType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLive, setIsLive] = useState<boolean>(false);
    const [liveData, setLiveData] = useState<MatchListType | null>(null);


    useEffect(() => {
        getMatchList();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (newMessage) {
            setIsLive(true);
            if (newMessage.matchId) {
                getFullMatchData(newMessage.matchId);
            }
        }
    }, [newMessage]);


    const checkLiveMatch = async (arr: any[]) => {
        for (const i of arr) {
            if (i.showMatch) {
                setIsLive(true);
                setLiveData(i)
                break;
            };
        }
    };

    const getFullMatchData = async (matchId: string) => {
        try {
            const resp = await getFullMatch({ matchId });
            setLiveData(resp);
        } catch (error) {
            console.log(error);
        };
    };

    const getMatchList = useCallback(async () => {
        try {
            setLoading(true)
            const data: MatchListType[] = await listMatch();

            await checkLiveMatch(data);

            const soreted = quickSort(data, 'matchNumber');
            const filtered = filterData(soreted);
            setMatches(filtered?.slice(0, 4));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        };
    }, [])

    function filterData(arr: MatchListType[]) {
        return arr.filter(each => {
            if (each.votingStarted) {
                return each;
            }
        })
    };

    const handelRemove = useCallback(async (id: string) => {
        try {
            setLoading(true)
            await updateMatchSingle({ matchId: id, updateKey: "showMatch", updateValue: false });
            setLoading(false)
            setIsLive(false);
            setLiveData(null)
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [])

    return (
        <>
            {loading &&
                <div className="relative w-full h-1 bg-transparent overflow-hidden mx-auto">
                    <div className="absolute top-0 left-0 w-full h-full bg-white animate-line-move"></div>
                </div>
            }
            <div className="w-full flex flex-col gap-10" style={{ height: 'calc(100vh - 250px)' }}>
                <div className="h-full flex flex-col w-full mb-10 lg:mb-10">
                    {isLive ?
                        <div className="h-full w-full py-6 px-4">
                            <LiveBoard data={liveData} handleRemove={handelRemove} />
                        </div>
                        :
                        <Heading />}
                </div>
                <div className="h-full w-full flex" id="match-section">
                    <div style={{ paddingTop: isLive ? "70px" : "30px", height: 'calc(100vh - 90px)' }} className={`flex-1`}>
                        <div className="text-md lg:text-xxl font-bold mb-3 pb-5 pl-[20px] lg:px-[70px]">UPCOMING MATCHES</div>
                        <div className=" border-b-[1px] border-b-[#514747] w-full h-[1px]"></div>
                        <div className="flex flex-col flex-wrap w-full justify-center items-center gap-10 pb-[50px] pt-[60px] lg:pt-[100px] lg:flex-row ">
                            {
                                loading ?
                                    <div className="flex items-center justify-center w-full">
                                        <p className="text-xxl animate-pulse text-center">Loading...</p>
                                    </div>
                                    // </div>
                                    :
                                    matches.length ?
                                        matches.map((match, index) => (
                                            <Matchpaper key={index}
                                                match={match}
                                            />
                                        ))
                                        :
                                        <div className="flex items-center justify-center w-full">
                                            <p className="text-xxl animate-pulse text-center">No Upcoming Matches</p>
                                        </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Hoc(memo(Dashboard));
