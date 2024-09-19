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
        // console.log("object");
        getMatchList();
    }, []);

    useEffect(() => {
        if (newMessage) {
            console.log("Dashboard Component liveContextData:", newMessage);
            setIsLive(true);
            if (newMessage.matchId) {
                getFullMatchData(newMessage.matchId);
            }
        }
    }, [newMessage]);

    // console.log("liveData", liveData);

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
            console.log({ resp });
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
            <div className="h-full w-full flex flex-col gap-10">
                <div className="h-full flex flex-col w-full">
                    {isLive ?
                        <div className="h-full w-full py-6 px-4">
                            <LiveBoard data={liveData} handleRemove={handelRemove} />
                        </div>
                        :
                        <Heading />}
                </div>
                <div className="h-full w-full px-2 lg:px-8 flex">
                    <div style={{ paddingTop: isLive ? "8px" : "100px" }} className={`flex-1 h-full `}>
                        <div className="text-md lg:text-xxl font-bold mb-3">Upcoming Matches</div>
                        <div className="flex flex-wrap w-full h-full justify-start gap-12">
                            {
                                loading ?
                                    <div className="w-[500px] h-[400px] flex justify-center items-center border border-borderColor rounded-md">
                                        <p className="text-xxl animate-pulse">Loading...</p>
                                    </div>
                                    :
                                    matches.length ?
                                        matches.map((match, index) => (
                                            <Matchpaper key={index}
                                                match={match}
                                            />
                                        ))
                                        :
                                        <div className="w-full h-full lg:w-[500px] lg:h-[400px] flex justify-center items-center border border-borderColor rounded-md">
                                            <p className="text-xxl animate-pulse">No Upcoming Match Added</p>
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
