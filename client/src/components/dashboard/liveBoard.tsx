import React, { useState } from 'react';
import { useAuth } from '../../context/authContext/authContext';
import { UserRole } from '../../context/authContext/authContextTypes';
import useMatchApi, { MatchListType } from '../../hooks/apiHooks/useMatchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

type SetBoardPropType = {
  score: number;
}

const SetBoard: React.FC<SetBoardPropType> = ({ score = 0 }) => {
  return (
    <div className='w-full h-full border border-borderColor flex justify-center items-center'>
      <p className=' text-xxl lg:text-4xl'>{score}</p>
    </div>
  )
}


type LiveScoreBoardPropType = {
  score: number;
}

const LiveScoreBoard: React.FC<LiveScoreBoardPropType> = ({ score = 0 }) => {
  return (
    <div className='h-full w-full border border-borderColor flex items-center justify-center cursor-pointer'>
      <p className='text-5xl lg:text-10xl'>{score}</p>
    </div>
  )
}

type ScoreChipPropType = {
  team1Score: number;
  team2Score: number;
  setNumber: number;
}

const ScoreChip: React.FC<ScoreChipPropType> = ({ team1Score = 0, team2Score = 0, setNumber = 0 }) => {
  return (
    <div className='w-[80px] lg:w-[200px] lg:p-1 font-extrabold flex flex-col justify-center items-center animate-slideIn'>
      <div className='text-md lg:text-xl'> <p>Set {setNumber}</p></div>
      <div className='w-[80px] lg:w-[200px] lg:p-2 flex justify-around items-center border rounded-md border-borderColor'>
        <p className='text-md lg:text-xl'>{team1Score}</p>
        <p className='text-md lg:text-xl pb-2'>&#9866;</p>
        <p className='text-md lg:text-xl'>{team2Score}</p>
      </div>
    </div>
  )
}


type LiveBoardType = {
  data: MatchListType | null;
  handleRemove: (id: string) => void;

}

const LiveBoard: React.FC<LiveBoardType> = ({ data, handleRemove }) => {

  const { playGame } = useMatchApi();
  const { state: { user } } = useAuth();

  const [isLive] = useState<boolean>(true);
  const [isMatch] = useState<boolean>(false);

  const handleClick = async (matchId: string, teamId: string) => {
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN) {
      if (!data?.winner) {
        if (matchId && teamId) {
          await playGame({ matchId, teamId, action: "score" });
        };
      }
    };
  };

  const handleUndoClick = async (matchId: string, teamId: string) => {
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN) {
      if (!data?.winner) {
        if (matchId && teamId) {
          await playGame({ matchId, teamId, action: "undo" });
        };
      }
    };
  };

  return (
    <div className='w-full h-full animate-opacity'>
      <div className='w-full text-center'>
        {
          isLive ?
            data?.winner ?
              <p className='font-bold text-xxl lg:text-3xl animate-pulse'>Recent Match</p>
              :
              <p className='font-bold text-xxl lg:text-3xl animate-pulse text-primary'>Live</p>
            :
            isMatch ?
              <p className='font-bold text-md lg:text-xxl'>Match will start at 21/09/24, 2:00 PM</p>
              :
              // <p className='font-bold text-3xl'>No Upcomming Match Added</p>
              <></>
        }

      </div>
      <div className='relative flex w-full h-full flex-col justify-center items-center'>
        {data?.winner && <div className=' w-full bg-white lg:h-[70px] absolute flex justify-center items-center'>
          <p className='font-extrabold text-md lg:text-3xl  text-black text-center p-3 w-full h-full'> Game Over - Team {data?.winner === data?.team1Id ? data?.team1Name : data?.team2Name} Wins  <FontAwesomeIcon icon={faTrophy} className='text-yellow-500 rotate-12' /></p>
        </div>}
        <div className='w-full lg:pt-[1%] flex flex-col'>
          <div className='flex justify-center items-center'>
            <p className='border border-borderColor lg:border-none px-4 text-xl lg:text-2xl font-bold'>Match {data?.matchNumber}</p>
          </div>
          <div className='flex px-2'>
            <div className='border w-[33%]  border-borderColor lg:border-none flex-1 text-end  pr-10  px-1 pt-2 lg:pt-5 text-md lg:text-xxl overflow-hidden whitespace-nowrap text-ellipsis'>{data?.team1Name}</div>
            <div className='border w-[33%]  border-borderColor lg:border-none flex-1 text-start pl-10  px-1 pt-2 lg:pt-5 text-md lg:text-xxl overflow-hidden whitespace-nowrap text-ellipsis'>{data?.team2Name}</div>
          </div>
          <div className='flex box-border px-2 justify-center'>
            <div className='w-[17%] lg:w-[5%] h-[50%] lg:h-[40%] border border-borderColor p-1 box-border'>
              <SetBoard score={data?.team1SetScore as number} />
            </div>
            <div onClick={() => handleClick(data?.matchId as string, data?.team1Id as string)} className='w-[33%] lg:w-[13%] h-[100%] lg:h-[100%] border border-borderColor  p-1'>
              <LiveScoreBoard score={data?.currentSet === 1 ? data?.team1Set1Score : data?.currentSet === 2 ? data?.team1Set2Score : data?.team1Set3Score as number} />
            </div>
            <div onClick={() => handleClick(data?.matchId as string, data?.team2Id as string)} className='w-[33%] lg:w-[13%] h-[100%] lg:h-[100%] border border-borderColor  p-1'>
              <LiveScoreBoard score={data?.currentSet === 1 ? data?.team2Set1Score : data?.currentSet === 2 ? data?.team2Set2Score : data?.team2Set3Score as number} />
            </div>
            <div className='w-[17%] lg:w-[5%] h-[50%] lg:h-[40%] border border-borderColor p-1 box-border'>
              <SetBoard score={data?.team2SetScore as number} />
            </div>
          </div>
          <div className='w-full pt-5 lg:pt-[1%] flex justify-center  items-center gap-5'>
            {data?.set1Winner && <div className=''><ScoreChip setNumber={1} team1Score={data?.team1Set1Score} team2Score={data?.team2Set1Score} /></div>}
            {data?.set2Winner && <div className=''><ScoreChip setNumber={2} team1Score={data?.team1Set2Score as number} team2Score={data?.team2Set2Score as number} /></div>}
            {data?.set3Winner && <div className=''><ScoreChip setNumber={3} team1Score={data?.team1Set3Score as number} team2Score={data?.team2Set3Score as number} /></div>}
          </div>
          {user?.role === UserRole.SUPER_ADMIN && <div className='flex items-center justify-center pt-5 lg:pt-[1%] lg:gap-2 gap-4'>
            <button onClick={() => handleUndoClick(data?.matchId as string, data?.team2Id as string)} className='w-[80px] lg:w-[160px] p-1 lg:p-2 bg-white text-md lg:text-xxl text-black font-bold rounded-md'>Undo</button>
            <button onClick={() => handleRemove(data?.matchId as string)} className='w-[100px] lg:w-[200px] p-1 lg:p-2 bg-white text-md lg:text-xxl text-black font-bold rounded-md'>Remove</button>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default LiveBoard