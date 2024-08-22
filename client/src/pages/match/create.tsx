import React, { useCallback, useEffect, useState } from 'react'
import MatchForm from '../../components/form/matchForm';
import { createMatch, MatchType } from '../../services/matchService';

const CreateMatch: React.FC = () => {


    const [matchData, setMatchData] = useState<Partial<MatchType>>({});
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string>("")
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);


    useEffect(() => {
        setIsVisible(true);
        return () => {
            setIsVisible(false);
        };
    }, []);

    const validateForm = useCallback(() => {
        if (!matchData.matchNumber) {
            setError("Match number is required")
            return false

        } else if (!matchData.team1Id) {
            setError("Team 1 Name is required")
            return false;
        } else if (!matchData.team2Id) {
            setError("Team 2 Name is required");
            return false;

        } else if (!matchData.date) {
            setError("Date is required")
            return false;
        } else if (matchData.team1Id === matchData.team2Id) {
            setError("Please select two different team")
            return false;
        };

        setError("");
        return true;
    }, [matchData]);

    useEffect(() => {

        if (isButtonClicked) {
            setIsError(!validateForm());
        };

    }, [matchData, isButtonClicked, validateForm])



    const handleCreate = async () => {

        setIsButtonClicked(true);

        if (validateForm()) {
            try {
                const resp = await createMatch(matchData as MatchType);

                if (resp.status) {
                    setIsSuccess(true);
                };

                setMatchData({});
                setIsButtonClicked(false);
                setTimeout(() => {
                    setIsSuccess(false);
                }, 800)

            } catch (err: any) {
                setIsError(true)
                setError(err?.response?.data || err);
            };
        }
    };

    return (
        <div className={`h-full w-full m-auto max-w-[750px] transition-opacity duration-300 ease-custom ${isVisible ? 'opacity-100' : "opacity-0"}`}>
            <div className='flex flex-col items-center justify-center pt-20'>
                <h1 className='text-3xl font-bold'>Create a Match </h1>
                <h4 className='opacity-50'>Complete the below fields to create a match</h4>
                <MatchForm
                    matchData={matchData}
                    setMatchData={setMatchData}
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


export default CreateMatch
