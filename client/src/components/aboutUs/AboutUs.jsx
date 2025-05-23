import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LazyLoad from "react-lazyload";

export default function AboutUs() {
    const { t } = useTranslation();
    return (
        <section className="bg-custom-gradient min-h-screen pt-24">
            <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <h2 className="text-5xl font-comic font-bold text-center text-white mb-8 tracking-tight">
                    {t('about.title')}
                </h2>
                <p className="text-xl font-comic text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                    {t('about.description')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">
                    <Link to='/dog-adoption' className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative h-64 xl:h-80 2xl:h-96 overflow-hidden">
                            <LazyLoad className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src="images/459158606_10161467394044451_4092756725960921795_n.webp"
                                    alt="Dog in need of adoption"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </LazyLoad>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6 xl:p-8">
                            <h3 className="text-2xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                {t('about.firstCardTitle')}
                            </h3>
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                {t('about.firstCardDescription')}
                            </p>
                        </div>
                    </Link>
                    <Link to='/cat-adoption' className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative h-64 xl:h-80 2xl:h-96 overflow-hidden">
                            <LazyLoad className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                                <img
                                    src="images/458920877_2688140651389056_8486540629879217644_n.webp"
                                    alt="Cat in need of adoption"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </LazyLoad>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6 xl:p-8">
                            <h3 className="text-2xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                {t('about.secondCardTitle')}
                            </h3>
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                {t('about.secondCardDescription')}
                            </p>
                        </div>
                    </Link>
                </div>
                <div className="text-center mt-16">
                    <Link to='/lost-found'
                        className="inline-block px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        {t('about.button')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
