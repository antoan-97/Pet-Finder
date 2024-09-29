import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white border-green-400 dark:bg-green-400">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to='/'
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="images/green.logo.jpg"
                        className="h-12 w-auto"
                        alt="PawFinder Logo"
                    />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        PawFinder
                    </span>
                </Link>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMenu}
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-500 md:p-0 dark:text-white"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/about-us'
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-500 md:p-0 dark:text-white"
                            >
                                About Us
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-500 md:p-0 dark:text-white"
                            >
                                Adopt a Pet
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-pink-100 md:hover:bg-transparent md:border-0 md:hover:text-pink-500 md:p-0 dark:text-white"
                            >
                                Lost & Found Pets
                            </a>
                        </li>

                    </ul>
                </div>

                {/* Right-aligned login/register/logout */}
                <div className="flex items-center">
                    <Link to='/login' className="bg-blue-500 text-white rounded px-4 m-1 py-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                        Login
                    </Link>
                    <Link to='/register' className="bg-blue-500 text-white rounded px-4 m-1 py-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                        Register
                    </Link>
                    <Link to='/logout' className="bg-blue-500 text-white rounded px-4 m-1 py-2 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
                        Logout
                    </Link>
                </div>
            </div>
        </nav>
    );
}
