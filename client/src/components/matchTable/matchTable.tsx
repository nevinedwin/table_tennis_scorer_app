import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/authContext/authContext';
import { MatchListType, MatchStatus } from '../../services/matchService';
import Pagination from '../TeamTable/pagination';
import { UserRole } from '../../context/authContext/authContextTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatTime } from '../../utilities/common';
import ToggleButton from '../toggleButton/toggleButton';

type MatchTablePropTypes = {
    data: Partial<MatchListType[]>,
    isLoading: boolean;
    handleEdit: (data: string) => void;
    handleDelete: (id: string) => void;
    handlePoll: (id: string) => void;
}

type LogoForPlayerPropTypes = {
    letter: string
}


const LogoForPlayer: React.FC<LogoForPlayerPropTypes> = ({ letter }) => {
    return (
        <div className='w-[25px] h-[25px] p-1 rounded-full border-secondary-dark border-2 text-center text-white flex justify-center items-center'>
            <p className='text-sm uppercase font-bold'>{letter?.slice(0, 2)}</p>
        </div>
    )
};


const MatchTable: React.FC<MatchTablePropTypes> = ({ data, isLoading, handleDelete, handleEdit }) => {
    const { state: { user } } = useAuth();

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [toggleState, setToggleState] = useState<{ toggleState: boolean }>({ toggleState: false });

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
        let passdata;

        if (toggleState.toggleState) {
            passdata = data.filter(eachItem => eachItem?.matchStatus === MatchStatus.Finished)
        } else {
            passdata = data.filter(eachItem => eachItem?.matchStatus === MatchStatus.Pending)
        };

        return passdata.filter(item =>
            item?.team1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team1Player1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team1Player2Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Player1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Player2Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formatDate(item?.date as string).includes(searchTerm) ||
            item?.matchStatus?.toLowerCase().includes(searchTerm.toLowerCase())
        );



    }, [searchTerm, data, toggleState]);

    // const filteredData = data;

    // Calculate the current data to display based on pagination
    const totalPages = searchTerm ? Math.ceil(filteredData.length / itemsPerPage) : Math.ceil(filteredData.length / itemsPerPage);
    const currentData = searchTerm ? filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className={`transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
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
                <ToggleButton isFalseState='Upcoming' isTruthState='Finished' name='toggleState' setToggle={setToggleState} toggle={toggleState.toggleState} />
            </div>
            <div className='w-full overflow-x-auto'>
                <table className='w-full border-spacing-y-4 border-separate text-xl cursor-default'>
                    <colgroup>
                        <col width="5%"></col>
                        <col width="10%"></col>
                        <col width="20%"></col>
                        <col width="20%"></col>
                        <col width="5%"></col>
                        <col width="5%"></col>
                        <col width="5%"></col>
                        <col width="5%"></col>
                        <col width="10%"></col>
                        {user?.role === UserRole.SUPER_ADMIN &&
                            <>
                                <col width="5%"></col>
                                <col width="5%"></col>
                            </>
                        }
                    </colgroup>
                    <thead>
                        <tr className='border-[1px] border-borderColor h-10 lg:h-20 bg-primary font-bold text-md lg:text-xl'>
                            <th className='p-2  text-center'>Match</th>
                            <th className='p-2  text-start'>Date</th>
                            <th className='p-2 text-start'>Teams</th>
                            <th className='p-2 text-start'>Players</th>
                            <th className='p-2 text-start'>1</th>
                            <th className='p-2 text-start'>2</th>
                            <th className='p-2 text-start'>3</th>
                            <th className='p-2 text-center'>Final</th>
                            <th className='p-2 text-center'>Status</th>
                            {/* <th className='p-2 text-start'>Vote</th> */}
                            {user?.role === UserRole.SUPER_ADMIN &&
                                <>
                                    <th className='p-2 text-center'>Edit</th>
                                    <th className='p-2 text-center'>Delete</th>
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length ?
                            currentData.map((eachItem, index) => (
                                <tr className='border border-borderColor h-10 lg:h-20 bg-borderColor text-white text-sm lg:text-xl' key={index}>
                                    <td className='p-2 text-center'>{eachItem?.matchNumber}</td>
                                    <td className='p-2'>
                                        <div className='w-full flex flex-col text-sm lg:text-xl'>
                                            <div>{formatDate(eachItem?.date as string)}</div>
                                            <div className='text-md uppercase'>{formatTime(eachItem?.date as string)}</div>
                                        </div>
                                    </td>
                                    <td className='p-2 text-nowrap'>
                                        <div className='w-full flex flex-col'>
                                            <div className='uppercase flex justify-start items-center gap-2 text-sm lg:text-xl'><LogoForPlayer letter={eachItem?.team1Name as string} />
                                                <span>{eachItem?.team1Name}</span> {eachItem?.team1Id === eachItem?.winner &&
                                                    <FontAwesomeIcon icon={faTrophy} className='text-yellow-500 rotate-12' />}</div>
                                            <div className='pl-12 text-sm'>vs</div>
                                            <div className='uppercase flex justify-start items-center gap-2 text-sm lg:text-xl'><LogoForPlayer letter={eachItem?.team2Name as string} />
                                                <span>{eachItem?.team2Name}</span>{eachItem?.team2Id === eachItem?.winner && <FontAwesomeIcon icon={faTrophy} className='text-yellow-500' />}</div>
                                        </div>
                                    </td>
                                    <td className='p-2 text-nowrap'>
                                        <div className='w-full flex flex-col text-sm lg:text-xl'>
                                            <div className='text-sm lg:text-lg'>{eachItem?.team1Player1Name} & {eachItem?.team1Player2Name}</div>
                                            <div className='text-sm lg:text-lg'>{eachItem?.team2Player1Name} & {eachItem?.team2Player2Name}</div>
                                        </div>
                                    </td>
                                    <td className='p-2'>
                                        <div className='w-full flex flex-col'>
                                            <div>{eachItem?.team1Set1Score}</div>
                                            <div>{eachItem?.team2Set1Score}</div>
                                        </div>
                                    </td>
                                    <td className='p-2'>
                                        <div className='w-full flex flex-col'>
                                            <div>{eachItem?.team1Set2Score}</div>
                                            <div>{eachItem?.team2Set2Score}</div>
                                        </div>
                                    </td>
                                    <td className='p-2'>
                                        <div className='w-full flex flex-col'>
                                            <div>{eachItem?.team1Set3Score}</div>
                                            <div>{eachItem?.team2Set3Score}</div>
                                        </div>
                                    </td>
                                    <td className='p-2'>
                                        <div className='w-full flex flex-col'>
                                            <div className='text-center'>{eachItem?.team1SetScore}</div>
                                            <div className='text-center'>{eachItem?.team2SetScore}</div>
                                        </div>
                                    </td>
                                    <td className='text-lg p-2 text-center'>{eachItem?.matchStatus === "PENDING" ? "Upcoming" : eachItem?.matchStatus}</td>
                                    {user?.role === UserRole.SUPER_ADMIN &&
                                        <>
                                            <td className='p-2 text-center'>
                                                <FontAwesomeIcon icon={faEdit} className='cursor-pointer text-xl p-4' onClick={() => handleEdit(eachItem?.matchId || "")} />
                                            </td>
                                            <td className='p-2 text-center'>
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
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default MatchTable