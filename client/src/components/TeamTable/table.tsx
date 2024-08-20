import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/authContext/authContext';
import { UserRole } from '../../context/authContext/authContextTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Pagination from './pagination'; // Import the Pagination component

type TablePropTypes = {
    data: Record<string, any>[];
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
};

const Table: React.FC<TablePropTypes> = ({ data, handleEdit, handleDelete }) => {
    const { state: { user } } = useAuth();

    const [isVisible, setIsVisible] = useState<boolean>(false);


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

    // Filtered data based on search term
    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.player1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.player2Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, data]);

    // Calculate the current data to display based on pagination
    const totalPages = searchTerm ? Math.ceil(filteredData.length / itemsPerPage) : Math.ceil(data.length / itemsPerPage);
    const currentData = searchTerm ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={`transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Team Name or Player Name.."
                    className="border border-borderColor bg-black p-2 w-[300px] focus:border-borderColor placeholder:opacity-70 placeholder:text-md"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                    }}
                />
            </div>
            <table className='w-full border-spacing-y-4 border-separate'>
                <thead>
                    <tr className='border-[1px] border-borderColor h-20 bg-primary font-bold'>
                        <th className='pl-4 text-start'>Team Name</th>
                        <th className='text-start'>Player's Name</th>
                        <th className='pr-4 text-start'>M</th>
                        <th className='pr-4 text-start'>W</th>
                        <th className='pr-4 text-start'>L</th>
                        {user?.role === UserRole.SUPER_ADMIN &&
                            <>
                                <th className='pl-8 text-start'>Edit</th>
                                <th className='text-start'>Delete</th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody>
                    {currentData.length ?
                        currentData.map((eachItem, index) => (
                            <tr className='border border-borderColor h-20 bg-borderColor text-white' key={index}>
                                <td className='pl-4'>{eachItem.teamName}</td>
                                <td>
                                    <span>{eachItem.player1Name}</span><br />
                                    <span>{eachItem.player2Name}</span>
                                </td>
                                <td className='pr-4'>{eachItem.matchPlayed}</td>
                                <td className='pr-4'>{eachItem.matchWon}</td>
                                <td className='pr-4'>{eachItem.matchLose}</td>
                                {user?.role === UserRole.SUPER_ADMIN &&
                                    <>
                                        <td className='pl-8'>
                                            <FontAwesomeIcon icon={faEdit} className='cursor-pointer text-xl p-4' onClick={() => handleEdit(eachItem.teamId)} />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faTrash} className='cursor-pointer text-xl p-4' onClick={() => handleDelete(eachItem.teamId)} />
                                        </td>
                                    </>
                                }
                            </tr>
                        ))
                        :
                        <tr>
                            <td className=''>No Data</td>
                        </tr>
                    }
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Table;
