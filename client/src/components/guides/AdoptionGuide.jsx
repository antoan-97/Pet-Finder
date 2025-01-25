import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

export default function PetAdoptionStarterGuide() {
    return (

        <section className="bg-custom-gradient py-12 h-full">
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-white mb-8">
                    Adoption Starter Guide
                </h2>
                <p className="text-lg text-gray-700 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
                    Adopting a pet is a rewarding experience, but it comes with responsibilities. If you're new to caring for a dog or cat, this guide will help you get started. From preparing your home to understanding your pet’s needs, we provide tips to ensure a smooth transition for both you and your new companion.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
                    <LazyLoad className="w-full  object-cover rounded-lg shadow-lg mb-6 sm:mb-0 sm:mr-6"
                    >
                        <img
                            src="images/dog-training-Tampa-1200x900.webp"
                            alt="New pet owner with dog"
                            className="w-full  object-cover rounded-lg shadow-lg mb-6 sm:mb-0 sm:mr-6"
                        />
                    </LazyLoad>
                    <div className="sm:w-1/2">
                        <h3 className="text-2xl font-semibold text-green-700 mb-4">
                            Tips for First-Time Pet Owners
                        </h3>
                        <ul className="list-disc list-inside text-gray-600">
                            <li>Prepare your home with a designated space for your new pet.</li>
                            <li>Introduce them slowly to their new environment.</li>
                            <li>Be patient and give them time to adjust.</li>
                            <li>Provide the right food, water, and basic supplies like bedding and toys.</li>
                            <li>Ensure your pet gets enough exercise and mental stimulation.</li>
                            <li>Visit a vet to ensure they are healthy and up to date on vaccinations.</li>
                            <li>Training and socializing are essential for a well-behaved pet.</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center">
                    <a
                        href="https://en.wikipedia.org/wiki/Pet_adoption"
                        className="inline-block px-6 py-3 text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg hover:from-green-700 hover:to-green-800 transition duration-300 ease-in-out transform hover:scale-105"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn More About Pet Adoption
                    </a>
                </div>

                <div className="text-center">
                    <Link
                        to='/lost-found'
                        className="inline-block px-6 mt-2 py-3 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Report Missing or Found Pets
                    </Link>
                </div>
            </div>
        </section>
    );



}
