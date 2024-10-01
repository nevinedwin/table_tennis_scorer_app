import React, { useState } from 'react'
import inAppLogo from '../../assets/Khel_Logo.svg';
import { useAuth } from '../../context/authContext/authContext';
import { AUTH_ACTIONS } from '../../context/authContext/authContextTypes';
import { signOut } from '@aws-amplify/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { navbarList } from './navlist';
import StyledButton from '../button/button';
import { useSocket } from '../../context/websocketContext/websocketContext';
import ManageLocalStorage, { localStorageKeys } from '../../utilities/ManageLocalStorage';

const { isLoading: isLoadingKey } = localStorageKeys;

const Navbar: React.FC = () => {


    const { state: { user }, dispatch } = useAuth();
    const { onDisconnect } = useSocket()

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

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
        <div className='w-full h-full py-4 px-4 lg:px-12 flex justify-between items-center text-white text-xl'>
            {/* left side */}
            <div className='flex-2 h-full flex items-center justify-start gap-10'>
                <div className='w-max-[200px] w-[150px] h-max-[100px] h-[60px]'>
                    <img src={inAppLogo} alt="" className='w-full h-full object-cover' />
                </div>
                <ul className='hidden lg:flex justify-between gap-10'>
                    {user && navbarList[user.role] && navbarList[user.role].map((eachItem, index) => (
                        <li key={index}
                            onClick={() => handleNavigation(eachItem.key)}
                            className={`
                            p-1 uppercase ${location.pathname === eachItem.key ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                        `}>
                            <p>{eachItem.value}</p>
                        </li>
                    ))}
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
                    <ul className="min-w-[70vw] flex flex-col items-center justify-between fixed top-1/2 left-1/2 -translate-x-1/2
              -translate-y-1/2 z-30 bg-black/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-32 border-white border animate-opacity">
                        {user && navbarList[user.role] && navbarList[user.role].map((eachItem, index) => (
                            <li key={index}
                                onClick={() => handleNavigation(eachItem.key)}
                                className={`
                                p-2 text-md uppercase ${location.pathname === eachItem.key ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                            `}>
                                <p>{eachItem.value}</p>
                            </li>
                        ))}
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

export default Navbar