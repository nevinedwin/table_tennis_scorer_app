import React, { useEffect, useRef, useState } from 'react'
import useTeamApi, { TeamType } from '../../hooks/apiHooks/useTeamApi';

type SearchInputPropType = {
    value?: string;
    placeholder: string,
    setData: (data: (prev: Record<string, any>) => Record<string, any>) => void;
    name: string;
    isButtonClicked: boolean;
    setForSearchInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchInput: React.FC<SearchInputPropType> = ({ placeholder, name, setData, value = "", isButtonClicked = false, setForSearchInput }) => {

    const {getTeam, listTeam} = useTeamApi();

    const [onFocus, setOnFocus] = useState<boolean>(false);
    const [teamList, setTeamList] = useState<TeamType[]>([]);
    const [insideValue, setInsideValue] = useState<string>("");
    const dropdownRef = useRef<HTMLDivElement>(null); // To handle clicks outside

    useEffect(() => {
        if (value) {
            getTeamData(value)
        }
    }, [value])

    useEffect(() => {
        if (isButtonClicked) {
            setInsideValue("")
            setForSearchInput(false);
        };

    }, [isButtonClicked])

    async function getTeamData(id: string) {
        try {
            const resp = await getTeam(id);
            setInsideValue(resp.teamName);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response: [] = await listTeam();
                setTeamList(response);
            } catch (error) {
                console.log(error);
            }
        };

        if (!teamList.length) {
            fetchTeam();
        }

        // Event listener to handle clicks outside the dropdown
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOnFocus(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [teamList]);

    const filteredData = teamList.filter((eachteam: TeamType) => eachteam.teamName.toLowerCase().includes(insideValue.toLowerCase()));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOnFocus(true);
        e.preventDefault();
        const { value } = e.target;
        setInsideValue(value);
    };

    const handleClick = () => {
        setOnFocus(!onFocus);
    };

    const handleSelect = (id: string, name: string, team: string) => {
        setData(prev => ({
            ...prev,
            [name]: id
        }));

        setInsideValue(team);
        setOnFocus(false);
    };

    return (
        <div ref={dropdownRef} className='relative flex flex-col items-center justify-center w-full gap-2'>
            <input
                id=''
                type="text"
                placeholder={placeholder}
                value={insideValue}
                name={name}
                onChange={handleChange}
                onClick={handleClick} // Toggle dropdown on click
                className='w-full p-2 rounded-sm outline-none border-2 border-borderColor bg-black
                            transition-all duration-300 ease-custom text-white focus:border-white
                            hover:border-white placeholder-gray-400'
            />

            {/* Display fetched data below the input */}
            {onFocus && (
                <div
                    className={`z-50 absolute left-0 top-10 w-full mt-2 bg-black border-b border-l border-r border-borderColor
                                transition-all duration-300 ease-custom overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700
                                scrollbar-track-gray-900 ${onFocus ? 'max-h-52' : 'max-h-0'}`}
                    style={{
                        maxHeight: '200px', // adjust as needed
                    }}
                >
                    {filteredData.length > 0 ? (
                        <ul className='w-full'>
                            {filteredData.map((item, index) => (
                                <li
                                    key={index}
                                    className='cursor-pointer p-2 hover:bg-gray-700 text-white border border-borderColor'
                                    onClick={() => handleSelect(item.id as string, name, item.teamName)}
                                >
                                    {item.teamName}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className='w-full'>
                            <li className='cursor-pointer p-2 hover:bg-gray-700 text-white border border-borderColor'>
                                No Data
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
