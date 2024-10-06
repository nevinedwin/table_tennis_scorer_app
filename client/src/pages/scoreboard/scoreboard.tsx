import React, { useEffect, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
// import PoolTable from '../../components/poolTable/poolTable';
// import { quickSortList } from '../../utilities/common';
import useTeamApi, { TeamType } from '../../hooks/apiHooks/useTeamApi';
import Table from '../../components/TeamTable/table';

const Scoreboard: React.FC = () => {

  const { listTeam, deleteTeam } = useTeamApi();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, _setIsEdit] = useState<boolean>(false);
  const [teamList, setTeamList] = useState<TeamType[]>([]);
  const [_isError, setIsErr] = useState<any>("");
  // const [teamAList, setTeamAList] = useState<TeamType[]>([]);
  // const [teamBList, setTeamBList] = useState<TeamType[]>([]);
  // const [teamCList, setTeamCList] = useState<TeamType[]>([]);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    if (!isDelete) {
      getList();
    };
  }, [isEdit, isDelete]);

  // useEffect(() => {
  //   if (teamList.length) {
  //     sortDataBasedOnTeamPool(teamList);
  //   };
  // }, [teamList])

  // const getList = async () => {

  //   try {
  //     setIsLoading(true);
  //     const data = await listTeam();
  //     setTeamList(data)
  //     setIsLoading(false)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const getList = async () => {

    try {
        setIsLoading(true);
        const data = await listTeam();
        setTeamList(data)
        setIsLoading(false)

    } catch (error: any) {
        setIsErr(error?.response?.data || "");
    } finally {
        setIsLoading(false);
    }
}


  // function sortDataBasedOnTeamPool(data: TeamType[]) {

  //   const poolA: TeamType[] = [];
  //   const poolB: TeamType[] = [];
  //   const poolC: TeamType[] = [];

  //   data.forEach(team => {
  //     if (team.pool === "A") {
  //       poolA.push(team);
  //     } else if (team.pool === "B") {
  //       poolB.push(team)
  //     } else {
  //       poolC.push(team)
  //     }
  //   });

  //   // setTeamAList(quickSortList(poolA) as TeamType[])
  //   // setTeamBList(quickSortList(poolB) as TeamType[])
  //   // setTeamCList(quickSortList(poolC) as TeamType[])
  // }

  // const handleEdit = (data: Record<string, any>) => {
  //   setIsEdit(true);
  //   setEditData(data);
  // };

  const handleDelete = async (id: string) => {
    try {

      setIsDelete(true);
      await deleteTeam(id);
      setIsDelete(false);

    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className={`transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
      <div className='flex flex-col gap-4 p-4 lg:p-10 justify-center items-center text-xxl lg:text-3xl font-bold'>
        <p>Team Scoreboard</p>
        <p className='text-xxl lg:text-2xl'>Knockouts</p>
      </div>
      {/* <div className={`w-full p-4 transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"} flex flex-col xl:flex-row xl:justify-around xl:items-start`}>
        <div className='xl:w-[30%] pb-6'>
          <PoolTable data={teamAList} isLoading={isLoading} pool={'A'} />
        </div>
        <div className='xl:w-[30%] pb-6'>
          <PoolTable data={teamBList} isLoading={isLoading} pool={'B'} />
        </div>
        <div className='xl:w-[30%]'>
          <PoolTable data={teamCList} isLoading={isLoading} pool={'c'} />
        </div>
      </div> */}

      {/* <h1 className='text-3xl font-bold text-center py-8'>Team List</h1> */}
      <div className='w-[70%] m-auto h-full'>
        <Table data={teamList} handleDelete={handleDelete} isLoading={isLoading} isEdit={false}/>
      </div>
    </div>
  )
}

export default Hoc(Scoreboard)