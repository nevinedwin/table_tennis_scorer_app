import { useState } from 'react';
import logo from "../../assets/InApp Logo - Vector (RGB).svg";
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import { MoonIcon, SunIcon } from '../../assets/icons/icons';
import { useAuth } from '../../context/authContext/authContext';
import { AUTH_ACTIONS } from '../../context/authContext/authContextTypes';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/appRouter';


const Navbar: React.FC = () => {

    const { dispatch } = useAuth();

    const navigate = useNavigate();

    const [mode, setMode] = useThemeSwitcher();
    const [isMenuOpen] = useState(false);


    const handleNavLinks = (option: string) => {

        if (option === "Logout") {
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
        } else {
            navigate(ROUTES.PREDICTION_SCOREBOARD);
        };
    };



    const navItems = ["prediction scoreboard", "Logout"]

    return (
        <nav className="bg-light dark:bg-secondary shadow-lg h-[80px]">
            <div className="w-full h-full flex justify-between items-center px-2 lg:px-10">
                <div className="max-w-[130px] max-h-[60px]">
                    <img className="w-full h-full" src={logo} alt="Logo" />
                </div>
                <div className="hidden lg:block">
                    <ul className="flex justify-start items-center gap-[20px] text-secondary dark:text-light">
                        {navItems.map((item) => (
                            <li key={item} onClick={() => handleNavLinks(item)} className="relative group">
                                <span className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-secondary-light">{item}</span>
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
                            </li>
                        ))}
                        <button onClick={() => setMode(mode === "light" ? "dark" : "light")} className={`w-[40px] h-[40px] flex items-center justify-center rounded-full p-1 ${mode === "light" ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                            {
                                mode === "dark" ? <SunIcon className={"fill-dark"} /> : <MoonIcon className={"fill-dark"} />
                            }
                        </button>
                    </ul>
                </div>
                <div className='flex gap-4 lg:hidden z-12'>

                    <button onClick={() => setMode(mode === "light" ? "dark" : "light")} className={`lg:hidden w-8 h-8 flex items-center justify-center rounded-full p-1 ${mode === "light" ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                        {
                            mode === "dark" ? <SunIcon className={"fill-dark"} /> : <MoonIcon className={"fill-dark"} />
                        }
                    </button>
                    {/* <button
                        className="lg:hidden text-secondary dark:text-primary transition-colors duration-300 ease-in-out hover:text-primary"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button> */}
                </div>
            </div>
            <div
                className={`lg:hidden bg-light dark:bg-secondary shadow-md overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <ul className="flex flex-col items-center py-4 text-secondary dark:text-light">
                    {navItems.map((item) => (
                        <li key={item} className="py-2">
                            <span className="cursor-pointer transition-colors duration-300 ease-in-out hover:text-primary">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;