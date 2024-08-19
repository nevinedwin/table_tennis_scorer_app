import React from 'react'
import inAppLogo from '../../assets/InApp Logo - Vector (RGB).svg';
import { useAuth } from '../../context/authContext/authContext';
import { AUTH_ACTIONS, UserRole } from '../../context/authContext/authContextTypes';
import { signOut } from '@aws-amplify/auth';


const navbarList = {

    [UserRole.USER]: [
        {
            key: "predictionBoard",
            value: "Prediction Ranking"
        },
        {
            key: "history",
            value: "History"
        },
        {
            key: "scoreboard",
            value: "Scoreboard"
        }
    ],
    [UserRole.ADMIN]: [
        {
            key: "predictionBoard",
            value: "Prediction Ranking"
        },
        {
            key: "history",
            value: "History"
        },
        {
            key: "scoreboard",
            value: "Scoreboard"
        }
    ],
    [UserRole.SUPER_ADMIN]: [
        {
            key: "predictionBoard",
            value: "Prediction Ranking"
        },
        {
            key: "history",
            value: "History"
        },
        {
            key: "scoreboard",
            value: "Scoreboard"
        }
    ],
}

const Navbar: React.FC = () => {


    const { state: { user }, dispatch } = useAuth();

    const handleSignout = () => {
        signOut();
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };


    return (
        <div className='w-full h-full py-4 px-12 flex justify-between items-center text-white text-xl'>
            {/* left side */}
            <div className='flex-1 h-full flex items-center justify-start gap-10'>
                <div className='w-max-[200px] w-[150px] h-max-[100px] h-[60px]'>
                    <img src={inAppLogo} alt="" className='w-full h-full object-cover' />
                </div>
                <ul className='flex justify-between gap-10'>
                    {user && navbarList[user.role] && navbarList[user.role].map((eachItem, index) => (
                        <li key={index} className='p-1 uppercase opacity-50 transition-opacity duration-200 ease-custom cursor-pointer hover:opacity-100 font-medium'>
                            <p>{eachItem.value}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* right side */}
            <div className='flex-1 flex justify-end items-center'>
                <button
                    onClick={handleSignout}
                    className={`bg-white w-[150px] p-2 text-black uppercase font-semibold rounded-md transition-bg-border duration-300 ease-custom text-center
                    hover:bg-black hover:text-white hover:border-white border-[1px]
                `}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar