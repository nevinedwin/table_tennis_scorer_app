import React, { useEffect, useMemo, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
// import PoolTable from '../../components/poolTable/poolTable';
// import { quickSortList } from '../../utilities/common';
import useTeamApi, { TeamType } from '../../hooks/apiHooks/useTeamApi';
import Table from '../../components/table/tableContainer';

const Scoreboard: React.FC = () => {


  let rowHead = [
    { title: "Sl.No", isAdmin: false, width: "5%", field: ["indexNumber"], headCellStyle: "", bodyCellStyle: "text-center" },
    { title: "TeamName", isAdmin: false, width: "20%", field: ["teamName"], headCellStyle: "text-center", bodyCellStyle: "text-center" },
    { title: "Player Name", isAdmin: false, width: "15%", field: ["player1Name", "player2Name"], headCellStyle: "text-center", bodyCellStyle: "text-center" },
    { title: "Matches Played", isAdmin: false, width: "10%", field: ["matchPlayed"], headCellStyle: "text-center", bodyCellStyle: "text-center" },
    { title: "Wins", isAdmin: false, width: "10%", field: ["matchWon"], headCellStyle: "text-center", bodyCellStyle: "text-center" },
    { title: "Losses", isAdmin: false, width: "10%", field: ["matchLose"], headCellStyle: "text-center", bodyCellStyle: "text-center" },
  ]


  const { listTeam } = useTeamApi();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [teamList, setTeamList] = useState<TeamType[]>([]);
  const [_isError, setIsErr] = useState<any>("");
  // const [teamAList, setTeamAList] = useState<TeamType[]>([]);
  // const [teamBList, setTeamBList] = useState<TeamType[]>([]);
  // const [teamCList, setTeamCList] = useState<TeamType[]>([]);


  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage: number = 5; // Number of rows per page

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const filteredData = useMemo(() => {
    if (searchTerm) {
      return teamList.filter((team: any) =>
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.player1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.player2Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return teamList;
  }, [searchTerm, teamList]);


  // Calculate the current data to display based on pagination
  const totalPages = searchTerm ? Math.ceil(filteredData.length / itemsPerPage) : Math.ceil(teamList.length / itemsPerPage);
  const currentData = searchTerm ? filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : teamList?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


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


  return (
    <div className={`w-[90%] m-auto h-full transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
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
      <div className='flex flex-col lg:flex-row justify-between items-center'>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-borderColor bg-bgColor p-2 w-[300px] focus:border-borderColor placeholder:opacity-70 placeholder:text-md text-md"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        {/* <div>
          {user?.role === UserRole.SUPER_ADMIN &&
            <div className='flex gap-2'>
              <StyledButton title='Users' handleClick={() => handleChangeRole('user')} classes={`${role === UserRole.USER ? 'bg-bgColor text-white border-[1px]' : ""}`} width={"100px"} />
              <StyledButton title='Referee' handleClick={() => handleChangeRole('admin')} classes={`${role === UserRole.ADMIN ? 'bg-bgColor text-white border-[1px]' : ""}`} width={"100px"} />
              <StyledButton title='Admin' handleClick={() => handleChangeRole('superAdmin')} classes={`${role === UserRole.SUPER_ADMIN ? 'bg-bgColor text-white border-[1px]' : ""}`} width={"90px"} />
            </div>
          }
        </div> */}
      </div>
      {/* <div className='w-[70%] m-auto h-full'> */}
      {/* <Table data={teamList} handleDelete={handleDelete} isLoading={isLoading} isEdit={false}/> */}
      <div className='pb-10'>

        <Table
          tableColumns={rowHead}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          bodyData={currentData}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
    // </div>
  )
}

export default Hoc(Scoreboard)