import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { useContext } from 'react';
export default function Home() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="bg-login-bg bg-cover bg-center flex-1">
            {/* Hero Section */}
            <section className="relative h-[600px] bg-cover bg-center"
                style={{ backgroundImage: "url('/images/hero-pets.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-5xl font-bold mb-4">
                            Find Your Perfect Pet Companion
                        </h1>
                        <p className="text-xl mb-8">
                            Connect lost pets with their families and help animals find their forever homes.
                        </p>
                        <div className="space-x-4">
                            <Link to="/lost-found"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                Report Lost/Found Pet
                            </Link>
                            <Link to="/adopt-pet"
                                className="bg-white hover:bg-gray-100 text-green-600 px-6 py-3 rounded-lg font-medium transition-colors">
                                Adopt a Pet
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Lost Pets */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-search text-red-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Lost Pets</h3>
                            <p className="text-gray-600 mb-4">
                                Report your lost pet and increase the chances of finding them.
                            </p>
                            <Link to="/lost-pets" className="text-red-600 hover:text-red-700 font-medium">
                                Report Lost Pet →
                            </Link>
                        </div>

                        {/* Found Pets */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-paw text-blue-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Found Pets</h3>
                            <p className="text-gray-600 mb-4">
                                Help reunite found pets with their worried families.
                            </p>
                            <Link to="/found-pets" className="text-blue-600 hover:text-blue-700 font-medium">
                                Report Found Pet →
                            </Link>
                        </div>

                        {/* Adopt Pets */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <i className="fas fa-heart text-green-600 text-2xl"></i>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Pet Adoption</h3>
                            <p className="text-gray-600 mb-4">
                                Give a loving home to pets waiting for adoption.
                            </p>
                            <Link to="/adopt-pet" className="text-green-600 hover:text-green-700 font-medium">
                                View Adoptable Pets →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-green-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h3 className="text-4xl font-bold mb-2">500+</h3>
                            <p>Pets Found</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">300+</h3>
                            <p>Happy Adoptions</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">1000+</h3>
                            <p>Active Users</p>
                        </div>
                        <div>
                            <h3 className="text-4xl font-bold mb-2">50+</h3>
                            <p>Partner Shelters</p>
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