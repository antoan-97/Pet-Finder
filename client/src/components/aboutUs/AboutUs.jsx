import { Link } from "react-router-dom";

export default function AboutUs() {
    return (
        <section className="bg-green-500 py-12">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-white mb-8">
                    About Us
                </h2>
                <p className="text-lg text-white text-center mb-6 max-w-3xl mx-auto">
                    Welcome to PawFinder, a platform dedicated to helping both homeless animals and pets that have gone missing. You can find pets in need of a loving home, or help reunite lost pets with their families by posting information about missing or found pets, including location and contact details. Whether you're looking to adopt or to assist in reuniting a pet with its owner, together we can make a difference in their lives and provide the care and support they deserve.                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to='/' className="bg-pink-100 rounded-lg shadow-md p-4">
                        <img
                            src="images/459158606_10161467394044451_4092756725960921795_n.webp"
                            alt="Dog in need of adoption"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-semibold text-blue-600 mt-4 text-center">
                            Meet Our Dogs
                        </h3>
                        <p className="text-gray-600 mt-2 text-center">
                            Dogs looking for a forever home. Adopt one today!                        </p>
                    </Link>
                    <Link to='/' className="bg-pink-100 rounded-lg shadow-md p-4">
                        <img
                            src="images/458920877_2688140651389056_8486540629879217644_n.webp"
                            alt="Cat in need of adoption"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-semibold text-blue-600 mt-4 text-center">
                            Meet Our Cats
                        </h3>
                        <p className="text-gray-600 mt-2 text-center">
                            Cats in need of love and care. Find your new furry friend!                        </p>
                    </Link>
                </div>

                <div className="text-center mt-10">
                    <Link to='/donate'
                        className="inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
                    >
                        Report Missing or Found Pets
                    </Link>
                </div>
            </div>
        </section>
    );
}
