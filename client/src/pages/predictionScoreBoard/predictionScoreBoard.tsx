import React, { useCallback, useEffect, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import Table from '../../components/table/tableContainer'
import { quickSort } from '../../utilities/common'
import useUserApi from '../../hooks/apiHooks/useUserApi'
import { UserRole } from '../../context/authContext/authContextTypes'

const PredictionScoreBoard: React.FC = () => {

  const { listUsers } = useUserApi();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserDate] = useState<any>([]);
  const [role, setRole] = useState<UserRole>(UserRole.SUPER_ADMIN)

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
    getList();
  }, []);


  const getList = useCallback(async () => {

    try {
      setIsLoading(true);
      const data = await listUsers({ role });

      const sortedData = quickSort<any, string>(data, "name");
      console.log({ sortedData });
      setUserDate(sortedData)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }, [isLoading]);


  const totalPages = searchTerm ? Math.ceil(userData.length / itemsPerPage) : Math.ceil(userData.length / itemsPerPage);


  let rowHead = [
    { title: "Sl.No", isAdmin: false, width: "5%", field: "indexNumber", headCellStyle: "", bodyCellStyle: "text-center" },
    { title: "Name", isAdmin: false, width: "20%", field: "displayName", headCellStyle: "text-left", bodyCellStyle: "text-left" },
    { title: "Email", isAdmin: false, width: "15%", field: "email", headCellStyle: "text-left", bodyCellStyle: "text-left" },
    { title: "Total Predictions", isAdmin: false, width: "10%", field: "totalPredictions", headCellStyle: "text-left", bodyCellStyle: "text-left" },
    { title: "Win", isAdmin: false, width: "10%", field: "predictionsWin", headCellStyle: "text-left", bodyCellStyle: "text-left" },
    { title: "Lose", isAdmin: false, width: "10%", field: "predictionsLose", headCellStyle: "text-left", bodyCellStyle: "text-left" },
    { title: "Edit", isAdmin: true, width: "20%", field: "edit", actionCell: true, actionItem: <></> },
    { title: "Delete", isAdmin: true, width: "20%", field: "delete", actionCell: true },
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
              className="border border-borderColor bg-black p-2 w-[300px] focus:border-borderColor placeholder:opacity-70 placeholder:text-md"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>
        <Table
          tableColumns={rowHead}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          bodyData={userData}
        />
      </div>
    </div>
  )
}

export default Hoc(PredictionScoreBoard)