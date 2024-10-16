import React, { memo, useState } from 'react'
import inAppLogo from '../../assets/Khel_Logo.svg';
import { useAuth } from '../../context/authContext/authContext';
import { AUTH_ACTIONS, UserRole } from '../../context/authContext/authContextTypes';
import { signOut } from '@aws-amplify/auth';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import StyledButton from '../button/button';
import { useSocket } from '../../context/websocketContext/websocketContext';
import ManageLocalStorage, { localStorageKeys } from '../../utilities/ManageLocalStorage';

const { isLoading: isLoadingKey } = localStorageKeys;

const Navbar: React.FC = () => {


    const { state: { user }, dispatch } = useAuth();
    const { onDisconnect } = useSocket()

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

    const location = useLocation();
    const navigate = useNavigate();

    const handleSignout = () => {
        signOut();
        onDisconnect();
        ManageLocalStorage.delete(isLoadingKey);
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    const handleNavigation = (endpoint: string) => {
        navigate(endpoint);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
        <div className='w-full h-full py-4 px-4 lg:px-12 flex justify-between items-center text-white text-[16px] bg-navbarBg'>
            {/* left side */}
            <div className='flex-2 h-full flex items-center justify-start gap-10'>
                <div className='w-max-[200px] w-[150px] h-max-[100px]'>
                    <img src={inAppLogo} alt="" onClick={() => handleNavigation("/dashboard")} className='w-full h-full object-cover cursor-pointer' />
                </div>
                <ul className='hidden lg:flex justify-between gap-10'>
                    <li
                        className={`
                            uppercase ${location.pathname === "/dashboard" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                        `}>
                        <NavLink to={"/dashboard"}>Dashboard</NavLink>
                    </li>
                    <li
                        className={`
                             uppercase ${location.pathname === "/matches" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                        `}>
                        <NavLink to={"/matches"}>Matches</NavLink>
                    </li>
                    <li
                        className={`
                             uppercase ${location.pathname === "/scoreboard" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                        `}>
                        <NavLink to={"/scoreboard"}>Scoreboard</NavLink>
                    </li>
                    <li
                        className={`
                             uppercase ${location.pathname === "/prediction_scores" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                        `}>
                        <NavLink to={"/prediction_scores"}>Prediction scores</NavLink>
                    </li>

                    {user?.role === UserRole.SUPER_ADMIN && (
                        <li
                            className={`
                             uppercase ${location.pathname === "/options" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                        `}>
                            <NavLink to={"/options"}>Options</NavLink>
                        </li>
                    )}
                </ul>
            </div>

            {/* right side */}
            <div className={`flex-1  justify-end items-center lg:flex hidden`}>
                <StyledButton title='Logout' handleClick={handleSignout} />
            </div>
            <div className='lg:hidden flex items-center'>
                <button onClick={toggleDropdown} className='flex-col justify-center items-center flex lg:hidden' >
                    <span className={`bg-white transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm  ${dropdownOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-white transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm my-0.5 ${dropdownOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-white transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${dropdownOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </button>
                {dropdownOpen && (
                    <ul className="min-w-[75vw] h-[60%] flex flex-col items-center justify-center gap-[5px] fixed top-1/2 left-1/2 -translate-x-1/2
              -translate-y-1/2 z-30 bg-navbarBg dark:bg-light/75 rounded-lg backdrop-blur-md border-white border animate-opacity">
                        <li
                            className={`
                                p-2 text-md uppercase ${location.pathname === "/dashboard" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                            `}>
                            <NavLink to={"/dashboard"}>Dashboard</NavLink>
                        </li>
                        <li
                            className={`
                                p-2 text-md uppercase ${location.pathname === "/matches" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                            `}>
                            <NavLink to={"/matches"}>Matches</NavLink>
                        </li>
                        <li
                            className={`
                                p-2 text-md uppercase ${location.pathname === "/scoreboard" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                            `}>
                            <NavLink to={"/scoreboard"}>Scoreboard</NavLink>
                        </li>
                        <li
                            className={`
                                p-2 text-md uppercase ${location.pathname === "/prediction_scores" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                            `}>
                            <NavLink to={"/prediction_scores"}>Prediction Scores</NavLink>
                        </li>
                        {user?.role === UserRole.SUPER_ADMIN && (
                            <li
                                className={`
                            p-2 text-md uppercase ${location.pathname === "/options" ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                        `}>
                                <NavLink to={"/options"}>Options</NavLink>
                            </li>
                        )}
                        <li className={`p-2 text-md uppercase opacity-50 transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                            `} onClick={handleSignout}>
                            <p>Logout &nbsp;</p>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default memo(Navbar)