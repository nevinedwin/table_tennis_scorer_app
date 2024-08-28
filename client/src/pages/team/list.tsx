import React, { useEffect, useState } from 'react'
import Table from '../../components/TeamTable/table'
import Edit from './edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { deleteTeam, listTeam } from '../../services/teamService';

const ListTeam: React.FC = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editData, setEditData] = useState<Record<string, any>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [teamList, setTeamList] = useState<Record<string, any>[]>([]);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isError, setIsErr] = useState<any>("");

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
            const data = await listTeam();
            setTeamList(data)
            setIsLoading(false)

        } catch (error: any) {
            console.log("cdacdsvsd",error);
            setIsErr(error?.response?.data || "");
        }finally{
            console.log("object");
            setIsLoading(false);
        }
    }

    const handleEdit = (data: Record<string, any>) => {
        setIsEdit(true);
        setEditData(data);
    };

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
        <div className={`w-full p-4 transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
            {isEdit ?
                <>
                    <FontAwesomeIcon icon={faArrowLeft} className='text-2xl cursor-pointer p-4' onClick={() => setIsEdit(false)} />
                    <Edit data={editData} setIsEdit={setIsEdit} />
                </>
                :
                <>
                    <h1 className='text-3xl font-bold text-center py-8'>Team List</h1>
                    <div className='w-[70%] m-auto h-full'>
                        <Table data={teamList} handleEdit={handleEdit} handleDelete={handleDelete} isLoading={isLoading} />
                    </div>
                </>
            }
        </div>
    )
}

export default ListTeam