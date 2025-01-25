import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

export default function AboutUs() {
    return (
        <section className="bg-custom-gradient min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <h2 className="text-5xl font-comic font-bold text-center text-white mb-8 tracking-tight">
                    About Us
                </h2>
                <p className="text-xl font-comic text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                    Welcome to PawFinder, a platform dedicated to helping both homeless animals and pets that have gone missing. You can find pets in need of a loving home, or help reunite lost pets with their families by posting information about missing or found pets, including location and contact details. Whether you're looking to adopt or to assist in reuniting a pet with its owner, together we can make a difference in their lives and provide the care and support they deserve.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Link to='/dog-adoption' className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                Dogs looking for a forever home. Adopt one today!
                            </p>
                        </div>
                    </Link>
                    <Link to='/cat-adoption' className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                Cats in need of love and care. Find your new furry friend!
                            </p>
                        </div>
                    </Link>
                </div>
                <div className="text-center mt-16">
                    <Link to='/lost-found'
                        className="inline-block px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Report Missing or Found Pets
                    </Link>
                </div>
            </div>
        </section>
    );
}
