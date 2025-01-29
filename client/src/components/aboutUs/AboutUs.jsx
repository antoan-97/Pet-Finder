import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

export default function AboutUs() {
    return (
        <section className="bg-login-bg bg-cover bg-fixed min-h-screen pt-24">
            <div className="backdrop-blur-sm bg-black/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-comic font-bold text-white mb-8 tracking-tight drop-shadow-lg">
                            About Us
                        </h2>
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-3xl mx-auto">
                            <p className="text-xl font-comic text-gray-800 leading-relaxed">
                                Welcome to PawFinder, a platform dedicated to helping both homeless animals and pets that have gone missing. You can find pets in need of a loving home, or help reunite lost pets with their families by posting information about missing or found pets, including location and contact details. Whether you're looking to adopt or to assist in reuniting a pet with its owner, together we can make a difference in their lives and provide the care and support they deserve.
                            </p>
                        </div>
                    </div>

                    {/* Cards Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Link to='/dog-adoption' 
                            className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/90">
                            <div className="relative h-64 overflow-hidden">
                                <LazyLoad className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                                    <img
                                        src="images/459158606_10161467394044451_4092756725960921795_n.webp"
                                        alt="Dog in need of adoption"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </LazyLoad>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                    Meet Our Dogs
                                </h3>
                                <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                                    Dogs looking for a forever home. Adopt one today!
                                </p>
                            </div>
                        </Link>

                        <Link to='/cat-adoption' 
                            className="group bg-white/80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/90">
                            <div className="relative h-64 overflow-hidden">
                                <LazyLoad className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                                    <img
                                        src="images/458920877_2688140651389056_8486540629879217644_n.webp"
                                        alt="Cat in need of adoption"
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </LazyLoad>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                    Meet Our Cats
                                </h3>
                                <p className="text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                                    Cats in need of love and care. Find your new furry friend!
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center mt-16">
                        <Link to='/lost-found'
                            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-black/30 backdrop-blur-sm rounded-full shadow-lg hover:bg-black/40 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 border border-white/20"
                        >
                            Report Missing or Found Pets
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
