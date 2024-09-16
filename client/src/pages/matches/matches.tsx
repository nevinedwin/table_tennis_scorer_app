import React, { useEffect, useState } from 'react'
import Hoc from '../../components/hoc/hoc'
import { quickSort } from '../../utilities/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import EditMatch from '../match/edit';
import MatchTable from '../../components/matchTable/matchTable';
import useMatchApi, { MatchListType, MatchStatus } from '../../hooks/apiHooks/useMatchApi';

const Matches: React.FC = () => {

  const {deleteMatch, listMatch, updateMatchSingle} = useMatchApi();
  
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchList, setMatchList] = useState<Partial<MatchListType[]>>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);

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


  const getList = async () => {

    try {
      setIsLoading(true);
      const data = await listMatch();

      const sortedData = quickSort(data as MatchListType[], "matchNumber");
      setMatchList(sortedData)
      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  };


  const handleEdit = (data: string) => {
    setIsEdit(true);
    setEditData(data);
  };

  const handleDelete = async (id: string) => {
    try {

      setIsDelete(true);
      await deleteMatch(id);
      setIsDelete(false);

    } catch (error) {
      setIsLoading(false);
      console.log(error);
    };
  };


  const handleLive = async (id: string) => {
    try {

      setIsLoading(true)
      await updateMatchSingle({ matchId: id, updateKey: "matchStatus", updateValue: MatchStatus.Live });
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <div className={`w-full p-4 transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
      {isEdit ?
        <>
          <FontAwesomeIcon icon={faArrowLeft} className='text-2xl cursor-pointer p-4' onClick={() => setIsEdit(false)} />
          <EditMatch data={editData} setIsEdit={setIsEdit} />
        </>
        :
        <>
          <h1 className='text-xxl lg:text-3xl font-bold text-center py-8'>Matches</h1>
          <div className='w-[90%] m-auto h-full'>
            <MatchTable data={matchList} isLoading={isLoading} handleDelete={handleDelete} handleEdit={handleEdit} handleLive={handleLive} />
          </div>
        </>
      }
    </div>
  )
}

export default Hoc(Matches)