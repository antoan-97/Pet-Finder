import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

export default function Navbar() {
    const { isAuthenticated } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-green-100 border-b border-green-400 dark:bg-green-500">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to='/'
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="images/paw.png"
                        className="h-12 w-auto"
                        alt="PawFinder Logo"
                    />
                    <span className="self-center text-xl font-semibold text-green-900 whitespace-nowrap dark:text-white">
                        PawFinder
                    </span>
                </Link>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMenu}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-300 dark:text-gray-400 dark:hover:bg-green-600 dark:focus:ring-green-700"
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
                                className="block py-2 px-3 text-gray-700 rounded hover:bg-green-200 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white dark:hover:text-green-300"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/about-us'
                                className="block py-2 px-3 text-gray-700 rounded hover:bg-green-200 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white dark:hover:text-green-300"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-700 rounded hover:bg-green-200 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white dark:hover:text-green-300"
                            >
                                Adopt a Pet
                            </a>
                        </li>
                        <li>
                            <Link to='/lost-found'
                            
                                className="block py-2 px-3 text-gray-700 rounded hover:bg-green-200 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white dark:hover:text-green-300"
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
                className="bg-green-600 text-white rounded px-4 m-1 py-2 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
                Login
            </Link>
            <Link
                to='/register'
                className="bg-green-600 text-white rounded px-4 m-1 py-2 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
                Register
            </Link>
        </>
    )}
    {isAuthenticated && (
        <Link
            to='/logout'
            className="bg-red-500 text-white rounded px-4 m-1 py-2 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
            Logout
        </Link>
    )}
</div>

            </div>
        </nav>
    );
}
