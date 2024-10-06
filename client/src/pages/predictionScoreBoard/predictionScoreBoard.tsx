import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import Table from '../../components/table/tableContainer'
import { quickSortAdvanced } from '../../utilities/common'
import useUserApi from '../../hooks/apiHooks/useUserApi'
import { RoleType, UserRole } from '../../context/authContext/authContextTypes'
import { useAuth } from '../../context/authContext/authContext'
import StyledButton from '../../components/button/button'

const PredictionScoreBoard: React.FC = () => {

  const { listUsers } = useUserApi();
  const { state: { user } } = useAuth()

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserDate] = useState<any>([]);
  const [role, setRole] = useState<RoleType>(UserRole.USER)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5; // Number of rows per page

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    console.log(role);
    getList();
  }, [role]);


  const getList = useCallback(async () => {

    try {
      setIsLoading(true);
      const data = await listUsers({ role });

      // const sortedData = quickSort<any, string>(data, "displayName");
      // Custom sort by `predictionsWin` first, then by `displayName`
      const sortedData = quickSortAdvanced<any>(data, (a, b) => {
        // Descending by wins
        if (a.predictionsWin !== b.predictionsWin) {
          return b.predictionsWin - a.predictionsWin;
        }
        // Ascending by name
        return a.displayName.localeCompare(b.displayName);
      });
      setUserDate(sortedData)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }, [role]);

  const filteredData = useMemo(() => {
    if (searchTerm) {
      return userData.filter((user: any) =>
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return userData;
  }, [searchTerm, userData]);


  // Calculate the current data to display based on pagination
  const totalPages = searchTerm ? Math.ceil(filteredData.length / itemsPerPage) : Math.ceil(userData.length / itemsPerPage);
  const currentData = searchTerm ? filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : userData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  function handleChangeRole(role: RoleType) {
    setRole(role)
  }

  let rowHead = [
    { title: "Sl.No", isAdmin: false, width: "5%", field: "indexNumber", headCellStyle: "", bodyCellStyle: "text-center" },
    { title: "Name", isAdmin: false, width: "20%", field: "displayName", headCellStyle: "text-center", bodyCellStyle: "text-center" },
    { title: "Email", isAdmin: false, width: "15%", field: "email", headCellStyle: "text-center", bodyCellStyle: "text-center" },
    { title: "Total Predictions", isAdmin: false, width: "10%", field: "totalPredictions", headCellStyle: "text-center", bodyCellStyle: "text-center" },
    { title: "Win", isAdmin: false, width: "10%", field: "predictionsWin", headCellStyle: "text-center", bodyCellStyle: "text-center" },
    { title: "Lose", isAdmin: false, width: "10%", field: "predictionsLose", headCellStyle: "text-center", bodyCellStyle: "text-center" },
    {
      title: "ChangeRole", isAdmin: true, width: "20%", field: "changeRole", actionCell: true, actionItem: <>
        {/* <FontAwesomeIcon icon={faTrash} className='cursor-pointer text-xl p-4' onClick={() => handleChangeRole(role === UserRole.USER ? UserRole.ADMIN : UserRole.USER)} /> */}
      </>
    },
  ]


  return (
    <div className='w-[90%] m-auto h-full'>
      <div className={`w-full p-4 transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
        <h1 className='text-xxl lg:text-3xl font-bold text-center py-8'>Prediction Scoreboard</h1>
        <div className='flex flex-col lg:flex-row justify-between items-center'>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="border border-borderColor bg-bgColor p-2 w-[300px] focus:border-borderColor placeholder:opacity-70 placeholder:text-md"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
          <div>
            {user?.role === UserRole.SUPER_ADMIN &&
              <div className='flex gap-2'>
                <StyledButton title='Users' handleClick={() => handleChangeRole('user')} classes={`${role === UserRole.USER ? 'bg-bgColor text-white border-[1px]' : ""}`} width={"100px"} />
                <StyledButton title='Referee' handleClick={() => handleChangeRole('admin')} classes={`${role === UserRole.ADMIN ? 'bg-bgColor text-white border-[1px]' : ""}`} width={"100px"} />
                <StyledButton title='Admin' handleClick={() => handleChangeRole('superAdmin')} classes={`${role === UserRole.SUPER_ADMIN ? 'bg-bgColor text-white border-[1px]' : ""}`} width={"90px"} />
              </div>
            }
          </div>
        </div>
        <Table
          tableColumns={rowHead}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          bodyData={currentData}
        />
      </div>
    </div>
  )
}

export default Hoc(PredictionScoreBoard)