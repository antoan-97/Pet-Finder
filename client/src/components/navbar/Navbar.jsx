import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContext from '../../contexts/AuthContext';

export default function Navbar() {
    const { t, i18n } = useTranslation();
    const { isAuthenticated } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const isHomePage = location.pathname === '/';


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'bg' ? 'en' : 'bg';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className="bg-green-500">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 border-b border-dotted">
                <Link to='/'
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="images/paw.webp"
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
                                {t('nav.home')}
                            </Link>
                        </li>
                        <li>
                            <Link to='/about-us'
                                className="block py-2 px-3 text-gray-700 rounded hover:bg-green-200 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white dark:hover:text-green-300"
                            >
                                {t('nav.about')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/adopt-pet'
                                className="block py-2 px-3 text-gray-700 rounded hover:bg-green-200 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white dark:hover:text-green-300"
                            >
                                {t('nav.adopt')}
                            </Link>
                        </li>
                        <li>
                            <Link to='/lost-found'

                                className="block py-2 px-3 text-gray-700 rounded hover:bg-green-200 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white dark:hover:text-green-300"
                            >
                                {t('nav.lostAndFound')}
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center">
                    {!isAuthenticated && (
                        <>
                            <Link
                                to='/login'
                                className="bg-green-600 text-white rounded px-4 m-1 py-2 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                {t('nav.login')}
                            </Link>
                            <Link
                                to='/register'
                                className="bg-green-600 text-white rounded px-4 m-1 py-2 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                {t('nav.register')}
                            </Link>
                        </>
                    )}
                    {isAuthenticated && (
                        <Link
                            to='/logout'
                            className="bg-green-600 text-white rounded px-4 m-1 py-2 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            {t('nav.logout')}
                        </Link>
                    )}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <span className="text-base font-medium">
                            {i18n.language === 'bg' ? (
                                <span className="flex items-center">
                                    <span className="mr-2 text-xl">🇬🇧</span>
                                    <span className="font-semibold">EN</span>
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <span className="mr-2 text-xl">🇧🇬</span>
                                    <span className="font-semibold">BG</span>
                                </span>
                            )}
                        </span>
                    </button>
                </div>

            </div>
        </nav>
    );
}
