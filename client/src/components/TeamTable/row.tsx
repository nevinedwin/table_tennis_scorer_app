import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useAuth } from '../../context/authContext/authContext';
import { UserRole } from '../../context/authContext/authContextTypes';

type RowPropTypes = {
    data: Record<string, any>;
}

const Row: React.FC<RowPropTypes> = ({ data }) => {

    const { state: { user } } = useAuth();

    return (
        <div className='w-full h-20 flex justify-start items-center px-4 border-[1px] border-borderColor text-xl'>
            <div className='flex-1 text-xxl'>{data.teamName}</div>
            <div className='flex-1 flex w-full flex-col justify-center items-start'>
                {data?.isHeading ? <div>{data.playerName}</div> :
                    <>
                        <div className=''>{data.player1Name}</div>
                        <div className=''>{data.player2Name}</div>
                    </>
                }
            </div>
            <div className='flex-[.5] text-center text-xxl'>{data.matchPlayed}</div>
            <div className='flex-[.5] text-center text-xxl'>{data.matchWon}</div>
            <div className='flex-[.5] text-center text-xxl'>{data.matchLose}</div>
            {user?.role === UserRole.SUPER_ADMIN && <div className='flex-[.5] text-end flex items-center justify-center  gap-4  '>
                {data?.isHeading ?
                    <>
                        <div className='p-4'>Edit</div>
                        <div className='p-4'>Delete</div>
                    </>
                    :
                    <>
                        <FontAwesomeIcon icon={faEdit} className='cursor-pointer text-2xl p-4' />
                        <FontAwesomeIcon icon={faTrash} className='cursor-pointer text-2xl p-4' />
                    </>
                }
            </div>}
        </div>
    )
}

export default Row