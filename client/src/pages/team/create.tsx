
import React, { memo, useCallback, useEffect, useState } from 'react'
import TeamForm from '../../components/form/teamForm';
import { validateEmail } from '../../utilities/common';
import useTeamApi, { TeamType } from '../../hooks/apiHooks/useTeamApi';

const CreateTeam: React.FC = () => {

    const { createTeam } = useTeamApi();

    const initalTeamData = {
        teamName: "",
        player1Email: "",
        player1Name: "",
        player2Email: "",
        player2Name: "",
        pool: "",
    };

    const [teamData, setTeamData] = useState<Partial<TeamType>>(initalTeamData);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string>("")
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);


    const validateForm = useCallback(() => {
        if (!teamData.teamName) {
            setError("Team Name is required");
            return false;
        } else if (!teamData.player1Name) {
            setError("Player 1 Name is required");
            return false;
        } else if (!teamData.pool) {
            setError("pool is required");
            return false;
        } else if (!teamData.player1Email) {
            setError("Player 1 Email is required");
            return false;
        } else if (!teamData.player2Name) {
            setError("Player 2 Name is required");
            return false;
        } else if (!teamData.player2Email) {
            setError("Player 2 Email is required");
            return false;
        } else if (teamData?.pool?.toUpperCase() !== "A" && teamData?.pool?.toUpperCase() !== "B" && teamData?.pool?.toUpperCase() !== "C" && teamData?.pool?.toUpperCase() !== "K") {
            setError("pool should be A | B |C | K");
            return false;
        } else if (!validateEmail(teamData.player1Email!)) {
            setError("Player 1 Email is Invalid. Use InApp Email");
            return false;
        } else if (!validateEmail(teamData.player2Email!)) {
            setError("Player 2 Email is Invalid. Use InApp Email");
            return false;
        } else if (teamData.player1Email === teamData.player2Email) {
            setError("Both email id's should not be same");
            return false;
        }

        setError("");
        return true;
    }, [teamData]);

    useEffect(() => {

        if (isButtonClicked) {
            setIsError(!validateForm());
        };

    }, [teamData, isButtonClicked, validateForm])

    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    }, []);


    const handleCreate = async () => {

        setIsButtonClicked(true);

        if (validateForm()) {
            try {
                const resp = await createTeam(teamData as TeamType);

                if (resp.status) {
                    setIsSuccess(true);
                };

                setTeamData(initalTeamData);
                setIsButtonClicked(false);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 1000)

            } catch (err: any) {
                setIsError(true)
                setError(err?.response?.data || err);
            };
        }
    };

    return (
        <div className={`h-full w-full m-auto lg:max-w-[750px] transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
            <div className='flex flex-col items-center justify-center pt-4 lg:pt-20'>
                <h1 className='text-xxl lg:text-3xl font-bold'>Create a Team </h1>
                <h4 className='opacity-50 text-md lg:text-xxl'>Complete the below fields to create a team</h4>
                <TeamForm
                    teamdata={teamData}
                    setTeamData={setTeamData}
                    handleCreate={handleCreate}
                    errorData={error}
                    isError={isError}
                    isbuttonClicked={isButtonClicked}
                    setButtonClicked={setIsButtonClicked}
                    isSuccess={isSuccess}
                />
            </div>
        </div>
    )
}

export default memo(CreateTeam);