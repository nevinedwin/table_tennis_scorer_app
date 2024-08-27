import React from 'react'
import inAppLogo from '../../assets/InApp Logo - Vector (RGB).svg';
import { useAuth } from '../../context/authContext/authContext';
import { AUTH_ACTIONS } from '../../context/authContext/authContextTypes';
import { signOut } from '@aws-amplify/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { navbarList } from './navlist';
import StyledButton from '../button/button';
import { useSocket } from '../../context/websocketContext/websocketContext';


const Navbar: React.FC = () => {


    const { state: { user }, dispatch } = useAuth();
    const { onDisconnect } = useSocket()

    const location = useLocation();
    const navigate = useNavigate();

    const handleSignout = () => {
        signOut();
        onDisconnect();
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    const handelNavigation = (endpoint: string) => {
        navigate(endpoint);
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
                            onClick={() => handelNavigation(eachItem.key)}
                            className={`
                            p-1 uppercase ${location.pathname === eachItem.key ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium
                        `}>
                            <p>{eachItem.value}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* right side */}
            <div className='flex-1 flex justify-end items-center'>
                <StyledButton title='Logout' handleClick={handleSignout} />
            </div>
        </div>
    )
}

export default Navbar