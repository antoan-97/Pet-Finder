import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
            <footer className="bg-green-500 text-green-900 dark:text-white py-8 border-t border-dotted">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* About PawFinder */}
                        <div>
                            <h4 className="text-lg font-bold mb-4">PawFinder</h4>
                            <p>
                                {t('footer.description')}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-bold mb-4">{t('footer.quickLinks')}</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/adopt-pet" className="hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300">
                                        {t('footer.adoption')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/lost-found' className="hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300">
                                        {t('footer.lostAndFound')}
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/guide' className="hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300">
                                        {t('footer.adoptionGuide')}
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://dari.four-paws.bg/s/?_ga=2.50020911.802577102.1630308141-1149300567.1591961121"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300"
                                    >
                                        {t('footer.support')}
                                    </a>
                                </li>
                             
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div>
                            <h4 className="text-lg font-bold mb-4">{t('footer.contact')}</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="mailto:pawfinder@abv.bg" className="hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300">
                                        pawfinder@abv.bg
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h4 className="text-lg font-bold mb-4">{t('footer.followUs')}</h4>
                            <div className="flex justify-center space-x-4">
                                <a
                                    href="https://www.facebook.com/profile.php?id=61567282290739"
                                    target="_blank"
                                    className="hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300"
                                >
                                    <i className="fab fa-facebook fa-lg" />
                                </a>
                                <a
                                    href="https://www.instagram.com/four_paws_international/?hl=bg"
                                    target="_blank"
                                    className="hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300"
                                >
                                    <i className="fab fa-instagram fa-lg" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="text-center mt-8">
                        <Link
                            to='/'
                            className="hover:text-green-700 dark:hover:text-green-300 transition-colors duration-300"
                        >
                            © 2024 PawFinder. {t('footer.copyright')}
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
