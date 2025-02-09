import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function AdoptAPet() {
    const { t } = useTranslation();
    return (
        <section className="bg-custom-gradient flex-1 min-h-screen pt-24 px-4">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-20">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
                    {t('adoption.title')}
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                    {t('adoption.description')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                    <Link to="/dog-adoption" className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative h-48 sm:h-64 overflow-hidden">
                            <img
                                src="images/dog-adoption.webp"
                                alt="Adopt Dog"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                {t('adoption.firstCardTitle')}
                            </h3>
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                {t('adoption.firstCardDescription')}
                            </p>
                        </div>
                    </Link>

                    <Link to="/cat-adoption" className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative h-48 sm:h-64 overflow-hidden">
                            <img
                                src="images/cat-adoption.webp"
                                alt="Adopt Cat"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                {t('adoption.secondCardTitle')}
                            </h3>
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                {t('adoption.secondCardDescription')}
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="text-center mt-16">
                    <Link to='/lost-found'
                        className="inline-block px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        {t('adoption.button')}
                    </Link>
                </div>
            </div>
        </section>
    );
}