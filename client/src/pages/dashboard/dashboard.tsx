import React, { memo, useCallback, useEffect, useState } from "react";
import Hoc from "../../components/hoc/hoc";
import Heading from "../../components/dashboard/heading";
import Matchpaper from "../../components/paper/matchpaper";
import { addVote, listMatch, MatchListType } from "../../services/matchService";
import { quickSort } from "../../utilities/common";
import LiveBoard from "../../components/dashboard/liveBoard";

export type NavigationType = 'details' | 'prediction';

const Dashboard: React.FC = () => {

    const [matches, setMatches] = useState<MatchListType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isLive, setIsLive] = useState<boolean>(false);


    useEffect(() => {
        getMatchList();
    }, []);

    const getMatchList = useCallback(async () => {
        try {
            setLoading(true)
            const data: MatchListType[] = await listMatch();
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

    return (
        <div className="h-full w-full flex flex-col">
            <div className="">
                {isLive ?
                    <div className="w-full">
                        <LiveBoard />
                    </div>
                    :
                    <Heading />}
            </div>
            <div className="px-8 flex">
                <div style={{ paddingTop: isLive ? "8px" : "100px" }} className={`flex-1 `}>
                    <div className="text-xxl font-bold mb-3">Upcoming Matches</div>
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
                                    <div className="w-[500px] h-[400px] flex justify-center items-center border border-borderColor rounded-md">
                                        <p className="text-xxl animate-pulse">No Upcoming Match Added</p>
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Hoc(memo(Dashboard));
