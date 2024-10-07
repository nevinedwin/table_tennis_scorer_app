import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext/authContext";
import { RoleType, UserRole } from "../../context/authContext/authContextTypes";
import useMatchApi, { MatchListType } from "../../hooks/apiHooks/useMatchApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

type SetBoardPropType = {
  score: number;
};

const SetBoard: React.FC<SetBoardPropType> = ({ score = 0 }) => {
  return (
    <div className="w-full h-full  flex justify-center items-center">
      <p className=" text-xxl lg:text-4xl">{score}</p>
    </div>
  );
};

type LiveScoreBoardPropType = {
  score: number;
  role: RoleType;
};

const LiveScoreBoard: React.FC<LiveScoreBoardPropType> = ({ score = 0, role }) => {
  return (
    <div className={`h-full w-full flex items-center justify-center cursor-pointer ${role === UserRole.USER ? 'cursor-default' : 'cursor-pointer'}`}>
      <p className="text-5xl lg:text-10xl">{score}</p>
    </div>
  );
};

type ScoreChipPropType = {
  team1Score: number;
  team2Score: number;
  setNumber: number;
};

const ScoreChip: React.FC<ScoreChipPropType> = ({
  team1Score = 0,
  team2Score = 0,
  setNumber = 0,
}) => {
  return (
    <div className="w-[80px] lg:w-[200px] lg:p-1 font-extrabold flex flex-col justify-center items-center animate-slideIn">
      <div className="text-md lg:text-xl">
        {" "}
        <p>Set {setNumber}</p>
      </div>
      <div className="w-[80px] lg:w-[200px] lg:p-2 flex justify-around items-center border rounded-md border-borderColor">
        <p className="text-md lg:text-xl">{team1Score}</p>
        <p className="text-md lg:text-xl pb-2">&#9866;</p>
        <p className="text-md lg:text-xl">{team2Score}</p>
      </div>
    </div>
  );
};

type LiveBoardType = {
  data: MatchListType | null;
  handleRemove: (id: string) => void;
};

const LiveBoard: React.FC<LiveBoardType> = ({ data, handleRemove }) => {
  const { playGame } = useMatchApi();
  const {
    state: { user },
  } = useAuth();

  const [isLive] = useState<boolean>(true);
  const [isMatch] = useState<boolean>(false);
  const [match, setMatch] = useState<MatchListType | null>(data)
  const [team1Score, setTeam1Score] = useState<number>(0);
  const [team2Score, setTeam2Score] = useState<number>(0);

  useEffect(() => {
    setMatch(data)
    if (data?.currentSet === 1) {
      setTeam1Score(data.team1Set1Score)
      setTeam2Score(data.team2Set1Score)
    } else if (data?.currentSet === 2) {
      setTeam1Score(data.team1Set2Score)
      setTeam2Score(data.team2Set2Score)
    } else if (data?.currentSet === 3) {
      setTeam1Score(data.team1Set3Score)
      setTeam2Score(data.team2Set3Score)
    }
  }, [data])

  const handleClick = async (matchId: string, teamId: string, teamNumber: number) => {
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN) {
      if (!match?.winner) {
        if (matchId && teamId) {
          if (teamNumber === 1) {
            setTeam1Score(prev => prev + 1);
          } else {
            setTeam2Score(prev => prev + 1)
          }
          await playGame({ matchId, teamId, action: "score" });
        }
      }
    }
  };

  const handleUndoClick = async (matchId: string, teamId: string) => {
    if (user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN) {
      if (!match?.winner) {
        if (matchId && teamId) {
          await playGame({ matchId, teamId, action: "undo" });
        }
      }
    }
  };

  return (
    <div className="w-full h-full animate-opacity">
      <h1 className="text-2xl lg:text-4xl font-ttHeading mb-4 text-center text-white text-shadow-md lg:text-shadow-xl">
        PING PONG '24
      </h1>
      <div className="w-full text-center">
        {isLive ? (
          match?.winner ? (
            <p className="font-bold text-xxl lg:text-3xl animate-pulse">
              Recent Match
            </p>
          ) : (
            <p className="font-normal text-xl lg:text-xxl animate-pulse text-primary">
              <span className="bg-primary text-white px-4 lg:px-8 rounded-full">Live</span>
            </p>
          )
        ) : isMatch ? (
          <p className="font-bold text-md lg:text-xxl">
            Match will start at 21/09/24, 2:00 PM
          </p>
        ) : (
          // <p className='font-bold text-3xl'>No Upcomming Match Added</p>
          <></>
        )}
      </div>
      <div className="relative flex w-full flex-col justify-center items-center">
        {match?.winner && (
          <div className=" w-full bg-white lg:h-[70px] absolute flex justify-center items-center">
            <p className="font-extrabold text-md lg:text-3xl  text-black text-center p-3 w-full h-full">
              {" "}
              Game Over - Team{" "}
              {match?.winner === match?.team1Id
                ? match?.team1Name
                : match?.team2Name}{" "}
              Wins{" "}
              <FontAwesomeIcon
                icon={faTrophy}
                className="text-yellow-500 rotate-12"
              />
            </p>
          </div>
        )}
        <div className="w-full  flex flex-col ">
          <div className="w-full flex justify-center items-center my-6">
            <p className=" px-4 text-xl lg:text-2xl font-medium">
              Match {match?.matchNumber}
            </p>
          </div>
          <div className=" rounded-lg w-full h-full shadow-lg flex justify-center items-center">
            <div className="w-[95%] lg:w-[70%] lg:p-8 p-4 bg-[#2D2D2D] rounded-xl">

              <div className="flex px-2 mb-4">
                <div className="w-[33%] flex-1 text-end pr-[30px] lg:pr-[100px]  px-1 pt-2 lg:pt-5 text-md lg:text-xxl overflow-hidden whitespace-nowrap text-ellipsis font-semibold">
                  {match?.team1Name}
                </div>
                <div className="w-[33%] flex-1 text-start pl-[30px] lg:pl-[100px]  px-1 pt-2 lg:pt-5 text-md lg:text-xxl overflow-hidden whitespace-nowrap text-ellipsis font-semibold">
                  {match?.team2Name}
                </div>
              </div>
              <div className="flex box-border lg:gap-4 px-2 justify-center">
                <div className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] bg-[#0E1528] p-1 box-border rounded-md border border-[#8080808C]">
                  <SetBoard score={match?.team1SetScore as number} />
                </div>
                <div
                  onClick={() =>
                    handleClick(match?.matchId as string, match?.team1Id as string, 1)
                  }
                  className="w-[100px] lg:w-[200px] h-[100px] lg:h-[200px] bg-[#0E1528]  p-1 rounded-md border border-[#8080808C]"
                >
                  <LiveScoreBoard
                    score={team1Score}
                    role={user?.role as UserRole}
                  />
                </div>
                <div
                  onClick={() =>
                    handleClick(match?.matchId as string, match?.team2Id as string, 2)
                  }
                  className="w-[100px] lg:w-[200px] h-[100px] lg:h-[200px] bg-[#0E1528] p-1 rounded-md border border-[#8080808C]"
                >
                  <LiveScoreBoard
                    score={team2Score}
                    role={user?.role as UserRole}
                  />
                </div>
                <div className="w-[50px] lg:w-[100px] h-[50px] lg:h-[100px] bg-[#0E1528] p-1 box-border rounded-md border border-[#8080808C]">
                  <SetBoard score={match?.team2SetScore as number} />
                </div>
              </div>
              <div className="w-full pt-5 lg:pt-[1%] flex justify-center  items-center gap-5">
                {match?.set1Winner && (
                  <div className="">
                    <ScoreChip
                      setNumber={1}
                      team1Score={match?.team1Set1Score}
                      team2Score={match?.team2Set1Score}
                    />
                  </div>
                )}
                {match?.set2Winner && (
                  <div className="">
                    <ScoreChip
                      setNumber={2}
                      team1Score={match?.team1Set2Score as number}
                      team2Score={match?.team2Set2Score as number}
                    />
                  </div>
                )}
                {match?.set3Winner && (
                  <div className="">
                    <ScoreChip
                      setNumber={3}
                      team1Score={match?.team1Set3Score as number}
                      team2Score={match?.team2Set3Score as number}
                    />
                  </div>
                )}
              </div>
              {user?.role === UserRole.SUPER_ADMIN && (
                <div className="flex items-center justify-center pt-5 lg:pt-[1%] lg:gap-2 gap-4">
                  <button
                    onClick={() =>
                      handleUndoClick(
                        match?.matchId as string,
                        match?.team2Id as string
                      )
                    }
                    className="w-[80px] lg:w-[160px] p-1 lg:p-2 bg-white text-md lg:text-xxl text-black font-bold rounded-md"
                  >
                    Undo
                  </button>
                  <button
                    onClick={() => handleRemove(match?.matchId as string)}
                    className="w-[100px] lg:w-[200px] p-1 lg:p-2 bg-white text-md lg:text-xxl text-black font-bold rounded-md"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBoard;
