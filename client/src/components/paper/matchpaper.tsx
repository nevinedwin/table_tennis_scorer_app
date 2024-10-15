import React, { memo, useEffect, useState } from "react";
import { findPercentage, formatDate, formatTime, getInitials } from "../../utilities/common";
import useMatchApi, { MatchStatus } from "../../hooks/apiHooks/useMatchApi";

type LogoForPlayerPropTypes = {
  letter: string;
  bgcolor: string;
};

type EachSectionPropTypes = {
  teamName: string;
  player1Name: string;
  player2Name: string;
  red: boolean;
  bgcolor: string;
};

const LogoForPlayer: React.FC<LogoForPlayerPropTypes> = ({ letter, bgcolor }) => {
  return (
    <div
      className={`w-[25px] h-[25px] rounded-full ${bgcolor} border-borderColor border text-center text-white flex justify-center items-center`}
    >
      <p className="text-md lg:text-sm uppercase font-bold">
        {getInitials(letter)}
      </p>
    </div>
  );
};

const EachSection: React.FC<EachSectionPropTypes> = ({
  // player1Name,
  teamName,
  // player2Name,
  bgcolor,
}) => {
  return (
    <div className="flex flex-[2] flex-col pt-3 justify-center items-center cursor-default">
      <div className="flex-2">
        <div
          className={`w-[30px] lg:w-[40px] h-[30px] lg:h-[40px] rounded-full ${bgcolor} border-borderColor border text-center text-white flex justify-center items-center`}
        >
          <p className="text-md lg:text-xl uppercase font-bold">
            {teamName && getInitials(teamName)}
          </p>
        </div>
      </div>
      <div className="mt-3 text-center text-sm lg:text-lg">
        {teamName}
      </div>
    </div>
  );
};

type MatchpaperType = {
  team1Name: string;
  team1Player1Name: string;
  team1Player2Name: string;
  team2Name: string;
  team2Player1Name: string;
  team2Player2Name: string;
  matchNumber: string;
  votingStarted: boolean;
  date: string;
  totalVoting: number;
  team1Voting: number;
  team2Voting: number;
  team1Id: string;
  team2Id: string;
  matchId: string;
  matchStatus: string
};

type VoteDataType = {
  isVoted: boolean;
  votedTeam?: string;
};

type MatchPaperPropTypes = {
  match: MatchpaperType;
};

const Matchpaper: React.FC<MatchPaperPropTypes> = ({ match }) => {
  const { addVote, getFullMatch, getVote } = useMatchApi();

  const [matches, setMatches] = useState<MatchpaperType | {}>(match);
  const {
    team1Name = "",
    team1Player1Name = "",
    team1Player2Name = "",
    team2Name = "",
    team2Player1Name = "",
    team2Player2Name = "",
    matchNumber = "",
    votingStarted: vottingStarted = false,
    date = "",
    totalVoting: totaVoting = 0,
    team1Voting: team1Votting = 0,
    team2Voting: team2Votting = 0,
    team1Id = "",
    team2Id = "",
    matchId = "",
    matchStatus = MatchStatus.Pending
  } = matches as MatchpaperType;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [voteData, setVoteData] = useState<VoteDataType | {}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isVoted = false, votedTeam = "" } = voteData as VoteDataType;


  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  useEffect(() => {
    if (matchId) {
      getVoteUser(matchId);
    }
  }, [])




  const getVoteUser = async (matchId: string) => {
    try {
      const resp = await getVote({ matchId });
      setVoteData((prev) => ({
        ...prev,
        isVoted: resp.voted,
        votedTeam: resp.teamName,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const getFullMatchData = async (matchId: string) => {
    try {
      const resp = await getFullMatch({ matchId });
      setMatches(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = async (teamId: string, matchId: string) => {
    try {
      if (!isVoted && matchStatus === MatchStatus.Pending) {
        setIsLoading(true);
        await addVote({ teamId, matchId });
        await getFullMatchData(matchId);
        await getVoteUser(matchId);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={`lg:max-w-[500px] w-[80%] lg:w-[420px] lg:h-[496px] rounded-xl transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
      <div className="w-full h-full flex flex-col">
        <div className="flex w-full bg-[#181D2A] rounded-t-xl p-4 lg:p-6">
          <EachSection
            teamName={team1Name}
            player1Name={team1Player1Name}
            player2Name={team1Player2Name}
            red={true}
            bgcolor="bg-[#65558F]"
          />
          <div className="w-full h-full flex-1 flex items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-xl lg:text-xxl font-extrabold uppercase">VS</div>
            </div>
          </div>
          <EachSection
            teamName={team2Name}
            player1Name={team2Player1Name}
            player2Name={team2Player2Name}
            red={false}
            bgcolor="bg-[#558F73]"
          />
        </div>

        <div className="flex justify-between text-white bg-[#2D2D2D] p-4">
          <div className="flex flex-col justify-center items-center flex-1 w-full">
            <p className="text-sm lg:text-md mt-2 font-bold">Players</p>
            <p className="text-sm mt-2 lg:text-lg overflow-hidden whitespace-nowrap text-ellipsis w-[90px] lg:w-[150px] text-center">{team1Player1Name}</p>
            <p className="text-sm lg:text-lg overflow-hidden whitespace-nowrap text-ellipsis w-[90px] lg:w-[150px] text-center">{team1Player2Name}</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-md lg:text-lg mb-4">{matchNumber}</p>
            <p className="text-md lg:text-lg">{formatDate(date)}</p>
            <p className="text-xs lg:text-sm">{formatTime(date)}</p>
          </div>
          <div className="flex flex-col justify-center items-center flex-1">
            <p className="text-sm lg:text-md  mt-2 font-bold">Players</p>
            <p className="mt-2 text-sm lg:text-lg overflow-hidden whitespace-nowrap text-ellipsis w-[90px] lg:w-[150px] text-center">{team2Player1Name}</p>
            <p className="text-sm lg:text-lg overflow-hidden whitespace-nowrap text-ellipsis w-[90px] lg:w-[150px] text-center">{team2Player2Name}</p>
          </div>
        </div>

        <div className="bg-[#3C3B3B] flex flex-col p-2 lg:p-4 rounded-b-xl justify-center items-center w-full">
          {isLoading &&
            <div className="relative w-full h-1 bg-transparent overflow-hidden mx-auto">
              <div className="absolute top-0 left-0 w-full h-full bg-blueColor animate-line-move"></div>
            </div>
          }
          <p className="text-white font-bold w-full text-center mb-2 lg:mb-3 mt-2 text-md lg:text-xl">
            WHO WILL WIN?
          </p>

          <div className="w-full p-2 ">
            {isVoted ? (
              <div className="flex bg-gray-700 rounded-md overflow-hidden items-center h-[30px] lg:h-[48px]">
                <div
                  className="bg-[#65558F] py-2 flex justify-between items-center text-white h-full transition-all duration-1000 ease-out  animate-slideInRight"
                  style={{
                    width: `${findPercentage(totaVoting, team1Votting, true)}%`,
                  }}
                >
                  <span className="ml-2 text-md lg:text-lg whitespace-nowrap">{team1Name}</span>
                  <span className="mr-2 text-md lg:text-lg ml-2">{`${findPercentage(
                    totaVoting,
                    team1Votting,
                    true
                  )}%`}</span>
                </div>
              </div>
            ) : (
              <button
                style={{ cursor: isVoted ? "default" : "pointer" }}
                onClick={() => handleVote(team1Id, matchId)}
                className="bg-[#65558F] w-full py-2 text-center text-white rounded-md h-[30px] lg:h-[48px] text-md lg:text-lg"
              >
                {team1Name}
              </button>
            )}
          </div>

          <div className="w-full p-2">
            {isVoted ? (
              <div className="flex bg-gray-700 rounded-md overflow-hidden items-center h-[30px] lg:h-[48px]">
                <div
                  className="bg-[#558F73] py-2 flex justify-between items-center text-white h-full transition-all duration-1000 ease-out animate-slideInRight"
                  style={{
                    width: `${findPercentage(totaVoting, team2Votting, true)}%`,
                  }}
                >
                  <span className="ml-2 text-md lg:text-lg whitespace-nowrap">{team2Name}</span>
                  <span className="mr-2 text-md lg:text-lg ml-2">{`${findPercentage(
                    totaVoting,
                    team2Votting,
                    true
                  )}%`}</span>
                </div>
              </div>
            ) : (
              <button
                style={{ cursor: isVoted ? "default" : "pointer" }}
                onClick={() => handleVote(team2Id, matchId)}
                className="bg-[#558F73] w-full py-2 text-center text-white rounded-md h-[30px] lg:h-[48px] text-md lg:text-lg"
              >
                {team2Name}
              </button>
            )}
          </div>
          <div className='pt-2 w-full pl-2'>
            {
              vottingStarted ?
                isVoted ?
                  <div className='flex justify-start items-center text-sm lg:text-md gap-2'>
                    <LogoForPlayer letter={votedTeam} bgcolor={`${votedTeam === team1Name ? "bg-[#65558F]" : "bg-[#558F73]"}`} />
                    <p className='text-sm lg:text-md text-white'>Your Vote</p>
                  </div>
                  :
                  <div className='text-sm lg:text-md'>Your prediction, your game - cast your vote.</div>
                :
                <p className='text-sm lg:text-md'>Voting Not Started.</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Matchpaper, (prevProps, nextProps) => {
  return prevProps === nextProps && prevProps === nextProps;
});
