import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';
export default function Home() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="bg-login-bg bg-cover bg-fixed min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[600px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-pets.jpg')" }}>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
                            Find Your Perfect Pet Companion
                        </h1>
                        <p className="text-xl mb-8 text-white/90 drop-shadow">
                            Connect lost pets with their families and help animals find their forever homes.
                        </p>
                        <div className="space-x-4">
                            <Link to="/lost-found"
                                className="bg-black/30 backdrop-blur-sm hover:bg-black/40 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-white/20">
                                Report Lost/Found Pet
                            </Link>
                            <Link to="/adopt-pet"
                                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-white/20">
                                Adopt a Pet
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 relative">
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white drop-shadow-lg">Our Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Lost Pets */}
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <div className="w-16 h-16 bg-red-100/90 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-search text-red-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white drop-shadow">Lost Pets</h3>
                            <p className="text-white/90 mb-4 drop-shadow">
                                Report your lost pet and increase the chances of finding them.
                            </p>
                            <Link to="/lost-pets" className="text-green-300 hover:text-green-200 font-medium inline-flex items-center">
                                Report Lost Pet 
                                <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                        </div>

                        {/* Found Pets */}
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <div className="w-16 h-16 bg-blue-100/90 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-paw text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white drop-shadow">Found Pets</h3>
                            <p className="text-white/90 mb-4 drop-shadow">
                                Help reunite found pets with their worried families.
                            </p>
                            <Link to="/found-pets" className="text-green-300 hover:text-green-200 font-medium inline-flex items-center">
                                Report Found Pet
                                <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                        </div>

                        {/* Adopt Pets */}
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <div className="w-16 h-16 bg-green-100/90 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-heart text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-white drop-shadow">Pet Adoption</h3>
                            <p className="text-white/90 mb-4 drop-shadow">
                                Give a loving home to pets waiting for adoption.
                            </p>
                            <Link to="/adopt-pet" className="text-green-300 hover:text-green-200 font-medium inline-flex items-center">
                                View Adoptable Pets
                                <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 relative">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h3 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">500+</h3>
                            <p className="text-white/90 drop-shadow">Pets Found</p>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h3 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">300+</h3>
                            <p className="text-white/90 drop-shadow">Happy Adoptions</p>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h3 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">1000+</h3>
                            <p className="text-white/90 drop-shadow">Active Users</p>
                        </div>
                        <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                            <h3 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">50+</h3>
                            <p className="text-white/90 drop-shadow">Partner Shelters</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 relative bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-pets.jpg')" }}>
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Content */}
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="max-w-3xl mx-auto bg-black/30 backdrop-blur-sm p-8 rounded-xl">
                        <h2 className="text-4xl font-bold mb-4 text-white leading-tight">
                            Ready to Make a Difference?
                        </h2>
                        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                            Join our community and help create happy endings for pets and their families.
                        </p>
                        <div className="space-x-4">
                            {isAuthenticated ? (
                                <Link to="/adopt-pet"
                                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                    Get Started Today
                                </Link>
                            ) : (
                                <Link to="/register"
                                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                                    Get Started Today
                                </Link>
                            )}
                            <Link to="/about-us"
                                className="inline-block bg-white hover:bg-gray-50 text-green-600 px-8 py-4 rounded-lg font-medium transition-all duration-200 border-2 border-green-600 hover:shadow-lg">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}