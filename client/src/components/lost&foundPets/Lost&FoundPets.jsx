import { Link } from "react-router-dom";

export default function LostAndFoundPets () {
    return (
        <section className="bg-custom-gradient h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl font-extrabold text-center text-white mb-8 tracking-tight">
                    Lost & Found Pets
                </h2>
                <p className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
                    Choose whether you want to help find a missing pet or post about a pet you’ve found.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Lost Pets Card */}
                    <Link to="/lost-pets" className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative h-48 sm:h-64 overflow-hidden">
                            <img
                                src="images/lost_pet.jpg"
                                alt="Lost Pets"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                Lost Pets
                            </h3>
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                Browse or post missing pets and help reunite them with their owners.
                            </p>
                        </div>
                    </Link>

                    {/* Found Pets Card */}
                    <Link to="/found-pets" className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative h-48 sm:h-64 overflow-hidden">
                            <img
                                src="images/found-pet.jpg"
                                alt="Found Pets"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                                Found Pets
                            </h3>
                            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                                Found a pet? Post it here and help them find their way home.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}