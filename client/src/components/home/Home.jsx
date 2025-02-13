import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { isAuthenticated } = useContext(AuthContext);
    const { t } = useTranslation();

    return (
        <div className="bg-login-bg bg-cover bg-center flex-1">
            {/* Hero Section - Improved mobile responsiveness */}
            <section className="relative min-h-[400px] sm:h-[600px] bg-cover bg-center w-full"
                style={{ backgroundImage: "url('/images/hero-pets.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="relative container mx-auto px-4 h-full flex items-center py-20 sm:py-0">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
                            {t('home.title')}
                        </h1>
                        <p className="text-lg sm:text-xl mb-8">
                            {t('home.titleDescription')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
                            <Link to="/lost-found"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center">
                                {t('home.titleReportButton')}
                            </Link>
                            <Link to="/adopt-pet"
                                className="bg-white hover:bg-gray-100 text-green-600 px-6 py-3 rounded-lg font-medium transition-colors text-center">
                                {t('home.titleAdoptionButton')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section - Improved spacing for mobile */}
            <section className="py-12 sm:py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('home.serviceTitle')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                        {/* Lost Pets */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i className="fas fa-search text-red-600 text-xl sm:text-2xl"></i>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{t('home.lostPets')}</h3>
                            <p className="text-gray-600 mb-4 text-sm sm:text-base text-center">
                                {t('home.lostPetsDescription')}
                            </p>
                            <div className="text-center">
                                <Link to="/lost-pets" className="text-red-600 hover:text-red-700 font-medium">
                                    {t('home.lostPetsButton')}
                                </Link>
                            </div>
                        </div>

                        {/* Found Pets - Similar updates */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i className="fas fa-paw text-blue-600 text-xl sm:text-2xl"></i>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{t('home.foundPets')}</h3>
                            <p className="text-gray-600 mb-4 text-sm sm:text-base text-center">
                                {t('home.foundPetsDescription')}
                            </p>
                            <div className="text-center">
                                <Link to="/found-pets" className="text-blue-600 hover:text-blue-700 font-medium">
                                    {t('home.foundPetsButton')}
                                </Link>
                            </div>
                        </div>

                        {/* Adopt Pets - Similar updates */}
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                <i className="fas fa-heart text-green-600 text-xl sm:text-2xl"></i>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{t('home.adoption')}</h3>
                            <p className="text-gray-600 mb-4 text-sm sm:text-base text-center">
                                {t('home.adoptionDescription')}
                            </p>
                            <div className="text-center">
                                <Link to="/adopt-pet" className="text-green-600 hover:text-green-700 font-medium">
                                    {t('home.adoptionButton')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section - Improved mobile layout */}
            <section className="py-12 sm:py-16 bg-green-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                        <div>
                            <h3 className="text-2xl sm:text-4xl font-bold mb-2">500+</h3>
                            <p className="text-sm  sm:text-base">{t('home.foundPets')}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-4xl font-bold mb-2">300+</h3>
                            <p className="text-sm sm:text-base">{t('home.happyAdoptions')}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-4xl font-bold mb-2">1000+</h3>
                            <p className="text-sm sm:text-base">{t('home.activeUsers')}</p>
                        </div>
                        <div>
                            <h3 className="text-2xl sm:text-4xl font-bold mb-2">50+</h3>
                            <p className="text-sm sm:text-base">{t('home.partners')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section - Improved mobile responsiveness */}
            <section className="py-12 sm:py-16 relative bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-pets.jpg')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm p-4 sm:p-8 rounded-xl">
                        <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-white leading-tight">
                            {t('home.differencesTitle')}
                        </h2>
                        <p className="text-base sm:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto">
                            {t('home.differencesDescription')}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
                            {isAuthenticated ? (
                                <Link to="/adopt-pet"
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                    {t('home.differencesButtonOne')}
                                </Link>
                            ) : (
                                <Link to="/register"
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                    {t('home.differencesButtonOne')}
                                </Link>
                            )}
                            <Link to="/about-us"
                                className="bg-white hover:bg-gray-50 text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-all duration-200 border-2 border-green-600 hover:shadow-lg">
                                {t('home.differencesButtonTwo')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}