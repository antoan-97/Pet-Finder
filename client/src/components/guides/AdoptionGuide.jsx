export default function PetAdoptionStarterGuide() {
    return (
        <section className="bg-green-500 py-12">
            <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-white mb-8">
                    Adoption Starter Guide
                </h2>
                <p className="text-lg text-white text-center mb-6 max-w-3xl mx-auto">
                    Adopting a pet is a rewarding experience, but it comes with responsibilities. If you're new to caring for a dog or cat, this guide will help you get started. From preparing your home to understanding your pet’s needs, we provide tips to ensure a smooth transition for both you and your new companion.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
                    <img
                        src="images/dog-training-Tampa-1200x900.webp"
                        alt="New pet owner with dog"
                        className="w-full sm:w-1/2 h-64 object-cover rounded-lg shadow-lg mb-6 sm:mb-0 sm:mr-6"
                    />
                    <div className="sm:w-1/2">
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Tips for First-Time Pet Owners
                        </h3>
                        <ul className="list-disc list-inside text-white">
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
                        className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn More About Pet Adoption
                    </a>
                </div>
            </div>
        </section>
    );
}
