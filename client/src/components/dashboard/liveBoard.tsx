import React, { useState } from 'react';


const SetBoard: React.FC = () => {
  return (
    <div className='w-[150px] h-[150px] border border-borderColor flex justify-center items-center mt-[60px]'>
      <p className='text-5xl'>0</p>
    </div>
  )
}

const LiveBoard: React.FC = () => {

  const [isLive, setIsLive] = useState<boolean>(true);
  const [isMatch, setIsMatch] = useState<boolean>(false);

  return (
    <div className='w-full h-full '>
      <div className='w-full flex items-center justify-center pt-10'>
        {
          isLive ? 
          <p className='font-bold text-3xl animate-pulse text-primary'>Live</p>
          :
          isMatch ? 
          <p className='font-bold text-xxl'>Match will start at 21/09/24, 2:00 PM</p>
          :
          // <p className='font-bold text-3xl'>No Upcomming Match Added</p>
          <></>
        }
          
      </div>
      <div className='flex flex-col justify-center items-center p-8'>
        <div className='flex gap-3'>
          <div>
            <SetBoard />
          </div>
          <div className='flex flex-col'>
            <div className='text-xxl text-center w-[270px] overflow-hidden whitespace-nowrap text-ellipsis mb-6'>Team 1 Name</div>
            <div className='w-[270px] h-[270px] border border-borderColor flex items-center justify-center'>
              <p className='text-center text-10xl'>0</p>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='text-xxl text-center w-[270px] overflow-hidden whitespace-nowrap text-ellipsis mb-6'>Team 1 Name</div>
            <div className='w-[270px] h-[270px] border border-borderColor flex items-center justify-center'>
              <p className='text-center text-10xl'>0</p>
            </div>
          </div>
          <div>
            <SetBoard />
          </div>
        </div>
        <div></div>

      </div>
    </div>
  )
}

export default LiveBoard