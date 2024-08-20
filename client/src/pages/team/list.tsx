import React, { useEffect, useState } from 'react'
import Table from '../../components/TeamTable/table'
import { sampleTableData } from '../../components/TeamTable/sampleTableData';
import Edit from './edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ListTeam: React.FC = () => {

    const [list, setList] = useState<Record<string, any>[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [edtId, setEditId] = useState<string>("");

    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    }, []);

    useEffect(() => {
        const data = sampleTableData;
        setList(data);
    });

    const handleEdit = (id: string) => {
        setIsEdit(true);
        setEditId(id);
        console.log(id);

    };

    const handleDelete = () => {

    };


    return (
        <div className={`w-full p-4 transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
            {isEdit ?
                <>
                    <FontAwesomeIcon icon={faArrowLeft} className='text-2xl cursor-pointer p-4' onClick={() => setIsEdit(false)} />
                    <Edit id={edtId} />
                </>
                :
                <>
                    <h1 className='text-3xl font-bold text-center py-8'>Team List</h1>
                    <div className='w-[70%] m-auto h-full'>
                        <Table data={list} handleEdit={handleEdit} handleDelete={handleDelete} />
                    </div>
                </>
            }
        </div>
    )
}

export default ListTeam