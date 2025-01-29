import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-auto w-full">
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
            
            <div className="bg-black/50 backdrop-blur-sm border-t border-white/10">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* About PawFinder */}
                        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h4 className="text-xl font-bold mb-4 text-white drop-shadow-lg">PawFinder</h4>
                            <p className="text-white/90 text-sm leading-relaxed drop-shadow">
                                PawFinder is your dedicated platform for adopting homeless pets and helping reunite lost pets with their families.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h4 className="text-xl font-bold mb-4 text-white drop-shadow-lg">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/adopt-pet" 
                                        className="text-white/90 hover:text-green-300 transition-all duration-300 hover:translate-x-1 inline-block drop-shadow">
                                        Adopt a Pet
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/lost-found' 
                                        className="text-white/90 hover:text-green-300 transition-all duration-300 hover:translate-x-1 inline-block drop-shadow">
                                        Lost & Found Pets
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/guide' 
                                        className="text-white/90 hover:text-green-300 transition-all duration-300 hover:translate-x-1 inline-block drop-shadow">
                                        Adoption Starter Guide
                                    </Link>
                                </li>
                                <li>
                                    <a href="https://dari.four-paws.bg/s/?_ga=2.50020911.802577102.1630308141-1149300567.1591961121"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/90 hover:text-green-300 transition-all duration-300 hover:translate-x-1 inline-block drop-shadow">
                                        Support Four Paws
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h4 className="text-xl font-bold mb-4 text-white drop-shadow-lg">Contact Us</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="mailto:pawfinder@abv.bg" 
                                       className="text-white/90 hover:text-green-300 transition-all duration-300 hover:translate-x-1 inline-block drop-shadow">
                                        pawfinder@abv.bg
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h4 className="text-xl font-bold mb-4 text-white drop-shadow-lg">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/profile.php?id=61567282290739"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-white/90 hover:text-green-300 transition-all duration-300 transform hover:scale-110 drop-shadow">
                                    <i className="fab fa-facebook fa-2x" />
                                </a>
                                <a href="https://www.instagram.com/four_paws_international/?hl=bg"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-white/90 hover:text-green-300 transition-all duration-300 transform hover:scale-110 drop-shadow">
                                    <i className="fab fa-instagram fa-2x" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-8 pt-8 border-t border-white/10">
                        <Link to='/'
                              className="text-white/90 hover:text-white transition-colors duration-300 drop-shadow">
                            © 2024 PawFinder. All rights reserved.
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
