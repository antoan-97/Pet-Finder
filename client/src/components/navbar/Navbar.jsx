import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export default function Navbar() {
    const { isAuthenticated } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const isHomePage = location.pathname === '/';


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        <div className="h-[76px]"></div>
        
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm transition-all duration-300">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 border-b border-white/20">
                <Link to='/'
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="images/paw.webp"
                        className="h-12 w-auto"
                        alt="PawFinder Logo"
                    />
                    <span className="self-center text-xl font-semibold text-white whitespace-nowrap">
                        PawFinder
                    </span>
                </Link>

                {/* Mobile menu button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-controls="navbar-default"
                    aria-expanded={isOpen ? 'true' : 'false'}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                {/* Center navigation links */}
                <div className={`${isOpen ? 'block' : 'hidden'} w-full md:flex md:items-center md:justify-center md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0 justify-center">
                        <li>
                            <Link to='/'
                                className="block py-2 px-3 text-white rounded hover:bg-white/20 md:hover:bg-transparent md:hover:text-green-300 md:p-0"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/about-us'
                                className="block py-2 px-3 text-white rounded hover:bg-white/20 md:hover:bg-transparent md:hover:text-green-300 md:p-0"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to='/adopt-pet'
                                className="block py-2 px-3 text-white rounded hover:bg-white/20 md:hover:bg-transparent md:hover:text-green-300 md:p-0"
                            >
                                Adopt a Pet
                            </Link>
                        </li>
                        <li>
                            <Link to='/lost-found'
                                className="block py-2 px-3 text-white rounded hover:bg-white/20 md:hover:bg-transparent md:hover:text-green-300 md:p-0"
                            >
                                Lost & Found Pets
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right-aligned login/register/logout */}
                <div className="flex items-center">
                    {!isAuthenticated && (
                        <>
                            <Link
                                to='/login'
                                className="bg-white/20 hover:bg-white/30 text-white rounded px-4 m-1 py-2 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Login
                            </Link>
                            <Link
                                to='/register'
                                className="bg-white/20 hover:bg-white/30 text-white rounded px-4 m-1 py-2 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Register
                            </Link>
                        </>
                    )}
                    {isAuthenticated && (
                        <Link
                            to='/logout'
                            className="bg-white/20 hover:bg-white/30 text-white rounded px-4 m-1 py-2 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Logout
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    </>
    );
}
