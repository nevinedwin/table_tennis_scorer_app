import React, { useEffect, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import PoolTable from '../../components/poolTable/poolTable';
import { quickSortList } from '../../utilities/common';
import useTeamApi, { TeamType } from '../../hooks/apiHooks/useTeamApi';

const Scoreboard: React.FC = () => {

  const { listTeam } = useTeamApi();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teamList, setTeamList] = useState<TeamType[]>([]);
  const [teamAList, setTeamAList] = useState<TeamType[]>([]);
  const [teamBList, setTeamBList] = useState<TeamType[]>([]);
  const [teamCList, setTeamCList] = useState<TeamType[]>([]);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (teamList.length) {
      sortDataBasedOnTeamPool(teamList);
    };
  }, [teamList])

  const getList = async () => {

    try {
      setIsLoading(true);
      const data = await listTeam();
      setTeamList(data)
      setIsLoading(false)

    } catch (error) {
      console.log(error);
    }
  }


  function sortDataBasedOnTeamPool(data: TeamType[]) {

    const poolA: TeamType[] = [];
    const poolB: TeamType[] = [];
    const poolC: TeamType[] = [];

    data.forEach(team => {
      if (team.pool === "A") {
        poolA.push(team);
      } else if (team.pool === "B") {
        poolB.push(team)
      } else {
        poolC.push(team)
      }
    });

    setTeamAList(quickSortList(poolA) as TeamType[])
    setTeamBList(quickSortList(poolB) as TeamType[])
    setTeamCList(quickSortList(poolC) as TeamType[])
  }

  return (
    <div>
      <div className='flex p-4 lg:p-10 justify-center items-center text-xxl lg:text-3xl font-bold'>
        <p>Team Scoreboard</p>
      </div>
      <div className={`w-full p-4 transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"} flex flex-col xl:flex-row xl:justify-around xl:items-start`}>
        <div className='xl:w-[30%] pb-6'>
          <PoolTable data={teamAList} isLoading={isLoading} pool={'A'} />
        </div>
        <div className='xl:w-[30%] pb-6'>
          <PoolTable data={teamBList} isLoading={isLoading} pool={'B'} />
        </div>
        <div className='xl:w-[30%]'>
          <PoolTable data={teamCList} isLoading={isLoading} pool={'c'} />
        </div>
      </div>
    </div>
  )
}

export default Hoc(Scoreboard)