import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/authContext/authContext';
import { UserRole } from '../../context/authContext/authContextTypes';
import Pagination from '../TeamTable/pagination';

type RowHeadTypes = {
    title: string,
    isAdmin?: boolean,
    width: string,
    field: string,
    actionCell?: boolean,
    // actionItem?: HTMLElement,
    actionFn?: () => void,
    bodyCellStyle?: string
}

type TableProps = {
    tableColumns: RowHeadTypes[],
    isLoading: boolean,
    bodyData: any,
    currentPage: number,
    totalPages: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Table: React.FC<TableProps> = ({ ...props }) => {

    const { tableColumns, isLoading, bodyData, currentPage = 1, totalPages = 1, setCurrentPage } = props;

    const { state: { user } } = useAuth();

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    }, []);

    return (
        <div className={`transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
            <div className='w-full overflow-x-auto'>
                <table className='w-full border-spacing-y-4 border-separate text-xl cursor-default'>
                    <colgroup>
                        {tableColumns.length && tableColumns.map((eachHead: any) => (
                            <React.Fragment key={eachHead.title}>
                                {eachHead.isAdmin && user?.role === UserRole.SUPER_ADMIN ? (
                                    <col width={eachHead.width}></col>
                                ) : (
                                    <col width={eachHead.width}></col>
                                )}
                            </React.Fragment>
                        ))}
                    </colgroup>
                    <thead>
                        <tr className='border-[1px] border-borderColor h-10 lg:h-20 bg-primary font-bold text-md lg:text-xl'>
                            {tableColumns.length && tableColumns.map((eachHead: any) => (
                                <React.Fragment key={eachHead.title}>
                                    {eachHead.isAdmin && user?.role === UserRole.SUPER_ADMIN ? (
                                        <th className={`p-2 ${eachHead?.headCellStyle || 'text-center'}`}>{eachHead.title}</th>
                                    ) : (
                                        <th className={`p-2 ${eachHead.headCellStyle || 'text-center'}`}>{eachHead.title}</th>
                                    )}
                                </React.Fragment>
                            ))}
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
                        {
                            bodyData.length ? bodyData.map((eachData: any, index: number) => (
                                <tr className='border border-borderColor h-10 lg:h-20 bg-borderColor text-white text-sm lg:text-xl' key={index}>
                                    {tableColumns.map((eachColum, index) => (
                                        eachColum.field === "indexNumber" ?
                                            <td key={index} className={`p-2 text-nowrap ${eachColum?.bodyCellStyle || 'text-center'}`}>
                                                <div className='w-full flex flex-col text-sm lg:text-xl'>
                                                    <div className='text-sm lg:text-lg'>{index + 1}</div>
                                                </div>
                                            </td>
                                            :
                                            <td key={index} className={`p-2 text-nowrap ${eachColum?.bodyCellStyle || 'text-center'}`}>
                                                <div className='w-full flex flex-col text-sm lg:text-xl'>
                                                    <div className='text-sm lg:text-lg'>{eachData[eachColum.field]}</div>
                                                </div>
                                            </td>
                                    ))}
                                </tr>
                            ))
                                :
                                !isLoading && <tr>
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
    )
}

export default Table