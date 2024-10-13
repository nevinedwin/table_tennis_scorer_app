import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/authContext/authContext';
import Pagination from '../TeamTable/pagination';
import { UserRole } from '../../context/authContext/authContextTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSignal, faTrash, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatTime } from '../../utilities/common';
import ToggleButton from '../toggleButton/toggleButton';
import { MatchListType, MatchStatus } from '../../hooks/apiHooks/useMatchApi';

type MatchTablePropTypes = {
    data: Partial<MatchListType[]>,
    isLoading: boolean;
    handleEdit: (data: string) => void;
    handleDelete: (id: string) => void;
    handleLive: (id: string) => void;
}

type SortByType = "matchNumber" | "date" | "matchStatus";

type SortStateType = {
    sortBy: SortByType,
    sortDirection: "asc" | "desc"
}

// type LogoForPlayerPropTypes = {
//     letter: string
// }


// const LogoForPlayer: React.FC<LogoForPlayerPropTypes> = ({ letter }) => {
//     return (
//         <div className='w-[25px] h-[25px] p-1 rounded-full border-secondary-dark border-2 text-center text-white flex justify-center items-center'>
//             <p className='text-sm uppercase font-bold'>{letter?.slice(0, 2)}</p>
//         </div>
//     )
// };


const MatchTable: React.FC<MatchTablePropTypes> = ({ data, isLoading, handleDelete, handleEdit, handleLive }) => {
    const { state: { user } } = useAuth();

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [toggleState, setToggleState] = useState<{ toggleState: boolean }>({ toggleState: false });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortState, setSortState] = useState<SortStateType>({ sortBy: "date", sortDirection: "desc" });
    const itemsPerPage = 5; // Number of rows per page

    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    }, []);

    const handleSort = (column: SortByType) => {
        setSortState(prev => ({
            sortBy: column,
            sortDirection: prev.sortBy === column && prev.sortDirection === 'asc' ? 'desc' : 'asc'
        }))
    }


    // Filtered data based on search term
    const filteredData = useMemo(() => {
        let passdata = data;

        if (toggleState.toggleState) {
            passdata = data.filter(eachItem => eachItem?.matchStatus === MatchStatus.Finished)
        } else {
            passdata = data
        };

        const filteredData = passdata.filter(item =>
            item?.team1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team1Player1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team1Player2Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Player1Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.team2Player2Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            formatDate(item?.date as string).includes(searchTerm) ||
            item?.matchStatus?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sortOrder = sortState.sortDirection === 'asc' ? 1 : -1;

        return filteredData.sort((a: any, b: any) => {

            if (a.matchStatus === 'LIVE' && b.matchStatus !== 'LIVE') return -1;
            if (b.matchStatus === 'LIVE' && a.matchStatus !== 'LIVE') return 1;

            if (sortState.sortBy === 'matchNumber') {
                return a?.matchNumber?.localeCompare(b?.matchNumber!) * sortOrder;
            } else if (sortState.sortBy === 'date') {
                return sortState.sortDirection === 'asc'
                    ? new Date(a.date).getTime() - new Date(b.date).getTime()
                    : new Date(b.date).getTime() - new Date(a.date).getTime()
            } else if (sortState.sortBy === 'matchStatus') {
                return a?.matchStatus?.localeCompare(b?.matchStatus!) * sortOrder;
            }
            return 0;
        });

    }, [searchTerm, data, toggleState, sortState]);

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
                        className="border border-white bg-bgColor p-2 w-[300px] focus:border-white placeholder:opacity-70 placeholder:text-md lg:placeholder:text-lg text-md lg:text-lg"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page on search
                        }}
                    />
                </div>
                <ToggleButton isFalseState='All' isTruthState='Finished' name='toggleState' setToggle={setToggleState} toggle={toggleState.toggleState} />
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
                                <col width="5%"></col>
                            </>
                        }
                    </colgroup>
                    <thead>
                        <tr className='border-[1px] border-borderColor h-10 lg:h-20 bg-primary font-bold text-md lg:text-xl'>
                            <th className='p-2  text-center cursor-pointer' onClick={() => handleSort('matchNumber')}>Match {sortState.sortBy === 'matchNumber' && (sortState.sortDirection === 'asc' ? '↑' : '↓')}</th>
                            <th className='p-2  text-center cursor-pointer' onClick={() => handleSort('date')}>Date {sortState.sortBy === 'date' && (sortState.sortDirection === 'asc' ? '↑' : '↓')}</th>
                            <th className='p-2 text-center'>Teams</th>
                            <th className='p-2 text-center'>Players</th>
                            <th className='p-2 text-center'>1</th>
                            <th className='p-2 text-center'>2</th>
                            <th className='p-2 text-center'>3</th>
                            <th className='p-2 text-center'>Final</th>
                            <th className='p-2 text-center cursor-pointer' onClick={() => handleSort('matchStatus')}> Status <span >{sortState.sortBy === 'matchStatus' && (sortState.sortDirection === 'asc' ? '↑' : '↓')}</span></th>
                            {/* <th className='p-2 text-start'>Vote</th> */}
                            {user?.role === UserRole.SUPER_ADMIN &&
                                <>
                                    <th className='p-2 text-center'>Edit</th>
                                    <th className='p-2 text-center'>Delete</th>
                                    <th className='p-2 text-center'>Go Live</th>
                                </>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading &&
                            <tr>

                                <td colSpan={user?.role === UserRole.SUPER_ADMIN ? 12 : 10} className='text-center'>
                                    <div className="relative w-full h-1 bg-transparent overflow-hidden mx-auto">
                                        <div className="absolute top-0 left-0 w-full h-full bg-white animate-line-move"></div>
                                    </div>
                                </td>
                            </tr>
                        }
                        {currentData.length ?
                            currentData.map((eachItem, index) => (
                                <tr
                                    style={{ backgroundSize: '200% 100%' }}
                                    className={`border border-borderColor h-10 lg:h-20 bg-borderColor text-white text-sm lg:text-xl 
                                ${eachItem?.matchStatus === 'LIVE' ? 'bg-gradient-to-r from-primary-light via-transparent to-primary-light animate-gradient-move' : ''}`
                                    } key={index}>
                                    <td className='p-2 text-center'>{eachItem?.matchNumber}</td>
                                    <td className='p-2'>
                                        <div className='w-full flex flex-col text-sm lg:text-xl text-center'>
                                            <div>{formatDate(eachItem?.date as string)}</div>
                                            <div className='text-md uppercase'>{formatTime(eachItem?.date as string)}</div>
                                        </div>
                                    </td>
                                    <td className='p-2 text-nowrap'>
                                        <div className='w-full flex flex-col'>
                                            <div className='uppercase flex justify-center items-center gap-2 text-sm lg:text-xl'>
                                                {eachItem?.team1Id === eachItem?.winner &&
                                                    <FontAwesomeIcon icon={faTrophy} className='text-yellow-500 rotate-12' />}
                                                <span>{eachItem?.team1Name}</span>
                                            </div>
                                            <div className='text-sm text-center'>vs</div>
                                            <div className='uppercase flex justify-center items-center gap-2 text-sm lg:text-xl'>
                                                {eachItem?.team2Id === eachItem?.winner && <FontAwesomeIcon icon={faTrophy} className='text-yellow-500 rotate-12' />}
                                                <span>{eachItem?.team2Name}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='p-2 text-nowrap'>
                                        <div className='w-full flex flex-col text-sm lg:text-xl'>
                                            <div className='text-sm lg:text-lg text-center'>{eachItem?.team1Player1Name} <span className='text-sm lg:text-2xl'>|</span> {eachItem?.team1Player2Name}</div>
                                            <div className='text-sm text-center'>vs</div>
                                            <div className='text-sm lg:text-lg text-center'>{eachItem?.team2Player1Name} <span className='text-sm lg:text-2xl'>|</span> {eachItem?.team2Player2Name}</div>
                                        </div>
                                    </td>
                                    <td className='p-2 text-center'>
                                        <div className='w-full flex flex-col'>
                                            <div>{eachItem?.team1Set1Score}</div>
                                            <div>{eachItem?.team2Set1Score}</div>
                                        </div>
                                    </td>
                                    <td className='p-2 text-center'>
                                        <div className='w-full flex flex-col'>
                                            <div>{eachItem?.team1Set2Score}</div>
                                            <div>{eachItem?.team2Set2Score}</div>
                                        </div>
                                    </td>
                                    <td className='p-2 text-center'>
                                        <div className='w-full flex flex-col'>
                                            <div>{eachItem?.team1Set3Score}</div>
                                            <div>{eachItem?.team2Set3Score}</div>
                                        </div>
                                    </td>
                                    <td className='p-2 text-center'>
                                        <div className='w-full flex flex-col'>
                                            <div className='text-center'>{eachItem?.team1SetScore}</div>
                                            <div className='text-center'>{eachItem?.team2SetScore}</div>
                                        </div>
                                    </td>
                                    <td className='text-sm lg:text-lg p-2 text-center'>{eachItem?.matchStatus === "PENDING" ? "Upcoming" : eachItem?.matchStatus}</td>
                                    {user?.role === UserRole.SUPER_ADMIN &&
                                        <>
                                            <td className='p-2 text-center'>
                                                <FontAwesomeIcon icon={faEdit} className='cursor-pointer text-xl p-4' onClick={() => handleEdit(eachItem?.matchId || "")} />
                                            </td>
                                            <td className='p-2 text-center'>
                                                <FontAwesomeIcon icon={faTrash} className='cursor-pointer text-xl p-4' onClick={() => handleDelete(eachItem?.matchId || "")} />
                                            </td>
                                            <td className='p-2 text-center'>
                                                {
                                                    eachItem?.matchStatus === MatchStatus.Pending ?
                                                        <FontAwesomeIcon icon={faSignal} className='cursor-pointer text-xl p-4' onClick={() => handleLive(eachItem?.matchId || "")} />
                                                        :
                                                        <p>Live</p>
                                                }
                                            </td>
                                        </>
                                    }
                                </tr>
                            ))
                            :
                            <tr>
                                {
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