import React, { memo, useEffect, useState } from "react";
import { findPercentage, formatDate, formatTime } from "../../utilities/common";
import useMatchApi from "../../hooks/apiHooks/useMatchApi";

type LogoForPlayerPropTypes = {
  letter: string;
};

type EachSectionPropTypes = {
  teamName: string;
  player1Name: string;
  player2Name: string;
  red: boolean;
  bgcolor: string;
};

const LogoForPlayer: React.FC<LogoForPlayerPropTypes> = ({ letter }) => {
  return (
    <div className="w-[25px] h-[25px] p-1 rounded-full border-borderColor border-2 text-center text-white flex justify-center items-center">
      <p className="text-sm uppercase font-bold">{letter?.slice(0, 2)}</p>
    </div>
  );
};

const EachSection: React.FC<EachSectionPropTypes> = ({
  player1Name,
  teamName,
  player2Name,
  bgcolor,
}) => {
  return (
    <div className="flex  flex-col pt-3 justify-center items-center cursor-default">
      <div className="flex-2">
        <div
          className={`w-[60px] h-[60px] rounded-full ${bgcolor} border-borderColor border text-center text-white flex justify-center items-center`}
        >
          <p className="text-3xl uppercase font-bold">
            {teamName?.slice(0, 2)}
          </p>
        </div>
      </div>
      <div className="mt-3 w-[150px] overflow-hidden whitespace-nowrap text-ellipsis text-center text-xxl">
        {teamName}
      </div>
      {/* <div className='flex flex-col mt-5 text-left'>
                <div className='flex gap-2 text-lg justify-start items-center'>
                    <LogoForPlayer letter={player1Name} />
                    <p className='w-[100px] overflow-hidden whitespace-nowrap text-ellipsis'>
                        {player1Name}
                    </p>
                </div>
            
                <div className='flex gap-2 text-lg justify-start items-center'>
                    <LogoForPlayer letter={player2Name} />
                    <p className='w-[100px] overflow-hidden whitespace-nowrap text-ellipsis'>
                        {player2Name}
                    </p>
                </div>
            </div> */}
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
};

type VoteDataType = {
  isVoted: boolean;
  votedTeam: string;
};

type MatchPaperPropTypes = {
  match: MatchpaperType;
};

const Matchpaper: React.FC<MatchPaperPropTypes> = ({ match }) => {
  const { addVote, getFullMatch, getVote } = useMatchApi();

  const [matches, setMatches] = useState<MatchpaperType | {}>(match);
  console.log("matches", matches);
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
  } = matches as MatchpaperType;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [voteData, setVoteData] = useState<VoteDataType | {}>({});

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

    }, [matchId])

    


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
      if (!isVoted) {
        await addVote({ teamId, matchId });
        await getFullMatchData(matchId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className={`max-w-[500px] w-full lg:w-[48%] xl:w-[32%] h-[380px] border border-white p-4 rounded-lg transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
    <div className="rounded-lg max-w-md mx-auto flex-1 mt-5">
      <div className="w-full h-full flex flex-col">
        {/* <div className='w-full h-[30px] text-xxl flex justify-center items-center pt-3'>
                    <div>{matchNumber}</div>
                </div> */}
        <div className="flex w-ful bg-[#0E1528] rounded-t">
          <EachSection
            teamName={team1Name}
            player1Name={team1Player1Name}
            player2Name={team1Player2Name}
            red={true}
            bgcolor="bg-[#65558F]"
          />
          <div className="w-full h-full flex-1 flex items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-xxl font-extrabold uppercase">VS</div>
              {/* <div className='text-xl font-bold'>{formatTime(date)}</div>
                            <div className='text-md font-medium'>{formatDate(date)}</div> */}
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

        <div className="flex justify-between p-4 text-white bg-borderColor">
          <div>
            <p className="text-sm font-semibold mt-2">Players</p>
            <p className="mt-2">{team1Player1Name}</p>
            <p>{team1Player2Name}</p>
          </div>
          <div className="text-center mt-5">
            <p className="text-lg">{formatTime(date)}</p>
            <p className="text-sm">{formatDate(date)}</p>
          </div>
          <div>
            <p className="text-sm font-semibold mt-2">Players</p>
            <p className="mt-2">{team2Player1Name}</p>
            <p>{team2Player2Name}</p>
          </div>
        </div>

        {/* <div className='bg-gray-500'>
                    <div className='text-white font-bold w-full text-center mb-3 mt-2'>Who will Win?</div>
                    <div className='flex w-full justify-center items-center gap-1'>
                        <div
                            style={{ width: isVoted ? `${findPercentage(totaVoting, team1Votting, true)}%` : '50%', cursor: isVoted ? 'default' : 'pointer' }}
                            onClick={() => handleVote(team1Id, matchId)}
                            className={`h-8 border
                         border-teal-600 rounded-md
                         hover:${isVoted ? 'bg-black' : 'bg-white'} hover:${isVoted ? 'text-white' : 'text-black'} transition-all duration-300 ease-custom
                         flex items-center justify-center font-bold cursor-pointer uppercase min-w-[10%]`}>
                            <p>
                                {isVoted ? `${findPercentage(totaVoting, team1Votting, false)}%` : team1Name?.slice(0, 2)}
                            </p>
                        </div>
                        <div
                            style={{ width: isVoted ? `${findPercentage(totaVoting, team2Votting, false)}%` : '50%', cursor: isVoted ? 'default' : 'pointer' }}
                            onClick={() => handleVote(team2Id, matchId)}
                            className={` h-8 
                        border border-red-300 rounded-md 
                        hover:${isVoted ? 'bg-black' : 'bg-white'} hover:${isVoted ? 'text-white' : 'text-black'} transition-all duration-300 ease-custom
                        flex items-center justify-center font-bold cursor-pointer uppercase min-w-[10%]`}>
                            <p>
                                {isVoted ? `${findPercentage(totaVoting, team2Votting, true)}%` : team2Name?.slice(0, 2)}
                            </p>
                        </div>
                    </div>
                    <div className='pt-2'>
                        {
                            vottingStarted ?
                                isVoted ?
                                    <div className='flex justify-start items-center text-md gap-2'>
                                        <LogoForPlayer letter={votedTeam} />
                                        <p className='text-md text-white'>Your Vote</p>
                                    </div>
                                    :
                                    <div className='text-md'>Your Prediction, your game - cast yout vote.</div>
                                :
                                <p className='text-md'>Voting Not Started.</p>
                        }
                    </div>
                </div> */}
        <div className="bg-[#3C3B3B]">
          <p className="text-white font-bold w-full text-center mb-3 mt-2">
            WHO WILL WIN?
          </p>

          <div className="mb-2 p-2">
            {isVoted ? (
              <div className="flex bg-gray-700 rounded-xl overflow-hidden items-center">
                <div
                  className="bg-[#65558F] py-2 flex justify-between items-center text-white"
                  style={{
                    width: `${findPercentage(totaVoting, team1Votting, true)}%`,
                  }}
                >
                  <span className="ml-2 whitespace-nowrap">{team1Name}</span>
                  <span className="mr-2 ml-2">{`${findPercentage(
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
                className="bg-[#65558F] w-full py-2 text-center text-white rounded-xl"
              >
                {team1Name}
              </button>
            )}
          </div>

          <div className="p-2">
            {isVoted ? (
              <div className="flex bg-gray-700 rounded-xl overflow-hidden items-center">
                <div
                  className="bg-[#558F73] py-2 flex justify-between items-center text-white"
                  style={{
                    width: `${findPercentage(totaVoting, team2Votting, true)}%`,
                  }}
                >
                  <span className="ml-2 whitespace-nowrap">{team2Name}</span>
                  <span className="mr-2 ml-2">{`${findPercentage(
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
                className="bg-[#558F73] w-full py-2 text-center text-white rounded-xl"
              >
                {team2Name}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Matchpaper, (prevProps, nextProps) => {
  return prevProps === nextProps && prevProps === nextProps;
});
