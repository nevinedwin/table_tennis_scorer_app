import React, { useEffect, useState } from 'react'
import { IMatch } from '../../sampleData/match_data'


type SetTablePropTypes = {
    matchData: IMatch
}


const SetTable: React.FC<SetTablePropTypes> = ({ matchData }) => {

    const [sets, setSets] = useState<number[]>([]);

    const setSample: { [key: number]: string } = {
        1: "1st",
        2: "2nd",
        3: "3rd",
        4: "4th",
        5: "5th"
    }


    useEffect(() => {
        let set = [];
        if (matchData?.numOfSets) {
            for (let i = 1; i <= matchData?.numOfSets; i++) {
                set.push(i);
            };
            setSets(set);
        };
    }, [matchData]);


    return (
        <div className={`bg-backgroundLightColor my-[8px] rounded-[16px] box-border px-[8px]`}>
            <table className={`table-fixed w-[100%] border-collapse border-spacing-0 `}>
                <thead className={`border-b  border-b-secondary-light`}>
                    <tr>
                        <th className={`font-medium text-secondary-light text-[14px]`}>
                            <div className={`py-[8px] text-center text-[14px] font-medium text-secondary-light`}></div>
                        </th>
                        {sets.map((_eachSet, index) => {
                            return (<th key={index} className={`font-medium text-secondary-light text-[14px]`}>
                                <div className={`py-[8px] text-center text-[14px] font-medium text-secondary-light`}>{setSample[index + 1]}</div>
                            </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div className={`flex justify-end items-end h-[32px] text-[12px] pb-[7px] uppercase text-ellipsis overflow-x-clip whitespace-nowrap min-w-0`}>{matchData?.teams?.team_1?.teamName}</div></td>
                        {
                            sets.map((_eachSet, index) => {
                                return (
                                    <td key={index}><div className={`flex justify-center items-end h-[32px] pb-[7px] ${(matchData?.sets[index + 1]?.team_1 ?? 0) > (matchData?.sets[index + 1]?.team_2 ?? 0) ? 'text-secondary-dark' : 'text-secondary-light'}`}>{matchData?.sets[index + 1]?.team_1}</div></td>
                                )
                            })
                        }
                    </tr>
                    <tr>
                        <td><div className={`flex justify-end items-end h-[32px] text-[12px] pb-[7px] uppercase text-ellipsis overflow-x-clip whitespace-nowrap min-w-0`}>{matchData?.teams?.team_2?.teamName}</div></td>
                        {
                            sets.map((_eachSet, index) => {
                                return (
                                    <td key={index}><div className={`flex justify-center items-end h-[32px] pb-[7px] ${(matchData?.sets[index + 1]?.team_1 ?? 0) < (matchData?.sets[index + 1]?.team_2 ?? 0) ? 'text-secondary-dark' : 'text-secondary-light'}`}>{matchData?.sets[index + 1]?.team_2}</div></td>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SetTable