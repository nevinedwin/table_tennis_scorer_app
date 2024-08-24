import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/authContext/authContext';
import { MatchListType } from '../../services/matchService';
import Pagination from '../TeamTable/pagination';
import { UserRole } from '../../context/authContext/authContextTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSquarePollVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatTime } from '../../utilities/common';

type MatchTablePropTypes = {
    data: Partial<MatchListType[]>,
    isLoading: boolean;
    handleEdit: (data: string) => void;
    handleDelete: (id: string) => void;
    handlePoll: (id: string) => void;
}

const MatchTable: React.FC<MatchTablePropTypes> = ({ data, isLoading, handleDelete, handleEdit, handlePoll }) => {
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
            item?.team1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team1Player1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team1Player2Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Player1Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Player2Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formatDate(item?.date as string).includes(searchTerm) ||
            item?.matchStatus.toLowerCase().includes(searchTerm.toLowerCase())
        );



    }, [searchTerm, data]);

    // const filteredData = data;

    // Calculate the current data to display based on pagination
    const totalPages = searchTerm ? Math.ceil(filteredData.length / itemsPerPage) : Math.ceil(data.length / itemsPerPage);
    const currentData = searchTerm ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={`transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
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
            <table className='w-full border-spacing-y-4 border-separate text-xl cursor-default'>
                <thead>
                    <tr className='border-[1px] border-borderColor h-20 bg-primary font-bold text-xl'>
                        <th className='pl-4 text-center'>Match</th>
                        <th className='pl-4 text-start'>Date</th>
                        <th className=' text-start'>Teams</th>
                        <th className='text-start'>Players</th>
                        <th className='pr-4 text-start'>1</th>
                        <th className='pr-4 text-start'>2</th>
                        <th className='pr-8 text-start'>3</th>
                        <th className='pr-4 text-start'>Final</th>
                        <th className='pr-4 text-start pl-8'>Status</th>
                        <th className='pl-8 text-start'>Vote</th>
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
                                <td className='pl-4 text-center'>{eachItem?.matchNumber}</td>
                                <td className='pl-4'>
                                    <div className='w-full flex flex-col'>
                                        <div>{formatDate(eachItem?.date as string)}</div>
                                        <div className='text-md uppercase'>{formatTime(eachItem?.date as string)}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className='w-full flex flex-col'>
                                        <div className='uppercase'>{eachItem?.team1Name}</div>
                                        <div className='uppercase'>{eachItem?.team2Name}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className='w-full flex flex-col'>
                                        <div className='text-lg'>{eachItem?.team1Player1Name} & {eachItem?.team1Player2Name}</div>
                                        <div className='text-lg'>{eachItem?.team2Player1Name} & {eachItem?.team2Player2Name}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className='w-full flex flex-col'>
                                        <div>{eachItem?.team1Set1Score}</div>
                                        <div>{eachItem?.team2Set1Score}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className='w-full flex flex-col'>
                                        <div>{eachItem?.team1Set2Score}</div>
                                        <div>{eachItem?.team2Set2Score}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className='w-full flex flex-col'>
                                        <div>{eachItem?.team1Set3Score}</div>
                                        <div>{eachItem?.team2Set3Score}</div>
                                    </div>
                                </td>
                                <td>
                                    <div className='w-full flex flex-col'>
                                        <div className='text-center'>{eachItem?.team1SetScore}</div>
                                        <div className='text-center'>{eachItem?.team2SetScore}</div>
                                    </div>
                                </td>
                                <td className='text-lg pl-8'>{eachItem?.matchStatus}</td>
                                <td className='pl-8'>
                                    <FontAwesomeIcon icon={faSquarePollVertical} className='cursor-pointer text-2xl p-4' onClick={() => handlePoll(eachItem?.matchId || '')} />
                                </td>
                                {/* <td className='pr-4'>{eachItem.matchPlayed}</td>
                                <td className='pr-4'>{eachItem.matchWon}</td>
                                <td className='pr-4'>{eachItem.matchLose}</td> */}
                                {user?.role === UserRole.SUPER_ADMIN &&
                                    <>
                                        <td className='pl-8'>
                                            <FontAwesomeIcon icon={faEdit} className='cursor-pointer text-xl p-4' onClick={() => handleEdit(eachItem?.matchId || "")} />
                                        </td>
                                        <td>
                                            <FontAwesomeIcon icon={faTrash} className='cursor-pointer text-xl p-4' onClick={() => handleDelete(eachItem?.matchId || "")} />
                                        </td>
                                    </>
                                }
                            </tr>
                        ))
                        :
                        <tr>
                            {isLoading ?
                                <td colSpan={user?.role === UserRole.SUPER_ADMIN ? 12 : 10} className='text-center'>
                                    <div className="relative w-full h-1 bg-transparent overflow-hidden mx-auto">
                                        <div className="absolute top-0 left-0 w-full h-full bg-white animate-line-move"></div>
                                    </div>
                                </td>
                                :
                                <td colSpan={user?.role === UserRole.SUPER_ADMIN ? 12 : 10} className="text-center">
                                    <div className="flex items-center justify-center h-40">
                                        <div className=" rounded-lg shadow-lg">
                                            <p className="text-white text-xxl font-semibold animate-pulse">No Data Available</p>
                                        </div>
                                    </div>
                                </td>
                            }
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
}

export default MatchTable