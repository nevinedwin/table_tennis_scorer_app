import React, { useCallback, useEffect, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import Table from '../../components/table/tableContainer'
import { quickSort } from '../../utilities/common'
import useUserApi from '../../hooks/apiHooks/useUserApi'
import { UserRole } from '../../context/authContext/authContextTypes'

let rowHead = [
  { title: "Match", isAdmin: false, width: "5%", field: "matchNumber", headCellStyle: "", bodyCellStyle: "text-center" },
  { title: "Date", isAdmin: false, width: "10%", field: "date" },
  { title: "Team", isAdmin: false, width: "20%", field: "team1Name" },
  { title: "Player", isAdmin: false, width: "20%", field: "player" },
  { title: "1", isAdmin: false, width: "5%", field: "1" },
  { title: "2", isAdmin: false, width: "5%", field: "2" },
  { title: "3", isAdmin: false, width: "5%", field: "3" },
  { title: "Final", isAdmin: false, width: "5%", field: "final" },
  { title: "Status", isAdmin: false, width: "10%", field: "status" },
  { title: "Edit", isAdmin: true, width: "5%", field: "edit", actionCell: true, actionItem: <></> },
  { title: "Delete", isAdmin: true, width: "5%", field: "delete", actionCell: true },
]

const PredictionScoreBoard: React.FC = () => {

  const { listUsers } = useUserApi();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserDate] = useState<any>([]);
  const [role, setRole] = useState<UserRole>(UserRole.SUPER_ADMIN)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5; // Number of rows per page

  useEffect(() => {
    getList();
  }, []);


  const getList = useCallback(async () => {

    try {
      setIsLoading(true);
      const data = await listUsers({ role });

      const sortedData = quickSort<any, string>(data, "name");
      console.log({sortedData});
      setUserDate(sortedData)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }, [isLoading]);


  const totalPages = searchTerm ? Math.ceil(userData.length / itemsPerPage) : Math.ceil(userData.length / itemsPerPage);

  return (
    <div>
      <Table
        tableColumns={rowHead}
        isLoading={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        bodyData={userData}
      />
    </div>
  )
}

export default Hoc(PredictionScoreBoard)