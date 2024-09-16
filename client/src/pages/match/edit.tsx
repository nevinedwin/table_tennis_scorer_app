import React, { memo, useCallback, useEffect, useState } from 'react'
import MatchForm from '../../components/form/matchForm';
import useMatchApi, { MatchType } from '../../hooks/apiHooks/useMatchApi';

type EditMatchPropTypes = {
    data: string;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditMatch: React.FC<EditMatchPropTypes> = ({ data, setIsEdit }) => {

    const {getMatch, editMatch} = useMatchApi();

    const [matchData, setMatchData] = useState<Partial<MatchType>>({});
    const [matchId] = useState<string>(data);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<string>("")
    const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [forSearchInput, setForSearchInput] = useState<boolean>(false);

    useEffect(() => {
        getMatchData(matchId)
    }, [matchId])

    async function getMatchData(id: string) {
        try {
            const resp = await getMatch(id);
            setMatchData(resp);
        } catch (error) {
            console.log(error);
        }
    }


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
                const resp = await editMatch(matchData as MatchType);

                if (resp.status) {
                    setIsSuccess(true);
                };

                setMatchData({});
                setIsButtonClicked(false);
                setForSearchInput(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsEdit(false);
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
                <h1 className='text-3xl font-bold'>Edit a Match </h1>
                <h4 className='opacity-50'>Complete the below fields to edit a match</h4>
                <MatchForm
                    matchData={matchData}
                    setMatchData={setMatchData}
                    handleCreate={handleCreate}
                    errorData={error}
                    isError={isError}
                    isbuttonClicked={isButtonClicked}
                    setButtonClicked={setIsButtonClicked}
                    isSuccess={isSuccess}
                    forSearchInput={forSearchInput}
                    setForSearchInput={setForSearchInput}
                    buttonTitle='Edit Match'
                />
            </div>
        </div>
    )
}


export default memo(EditMatch);
