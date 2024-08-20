import React from 'react'
import InputElement from '../inputElement/inputElement'
import StyledButton from '../button/button'

const TeamForm: React.FC = () => {

    const handleSubmit = () => {

    }

    return (
        <div className='w-full rounded-md p-8 mt-8 border-[1px] border-borderColor'>
            <div className='flex items-start justify-center flex-col w-full gap-2'>
                <p className='text-2md uppercase'>Team Name</p>
                <InputElement placeholder='Type your tame name here' />
            </div>
            {/* player details */}
            <div className='flex flex-col justify-center items-start mt-8 gap-3'>
                <p className='text-2md uppercase'>Player Details</p>
                <div className='flex items-center justify-start gap-2 w-full'>
                    <InputElement placeholder='Type player1 name' />
                    <InputElement placeholder='Type player1 email' />
                </div>
                <div className='flex items-center justify-start gap-2 w-full'>
                    <InputElement placeholder='Type player2 name' />
                    <InputElement placeholder='Type player2 email' />
                </div>
            </div>
            <div className='mt-10 flex justify-center items-center w-full'>
                <StyledButton handleClick={handleSubmit} title='Create Team' />
            </div>
        </div>
    )
}

export default TeamForm