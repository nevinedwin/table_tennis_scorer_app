import React, { useCallback, useEffect, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import Table from '../../components/table/tableContainer'
import useMatchApi, { MatchListType } from '../../hooks/apiHooks/useMatchApi'
import { quickSort } from '../../utilities/common'

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

  const { listMatch } = useMatchApi();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserDate] = useState<Partial<MatchListType[]>>([])

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
      const data = await listMatch();

      const sortedData = quickSort(data as MatchListType[], "matchNumber");
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