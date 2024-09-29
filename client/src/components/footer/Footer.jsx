import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            />
            <footer className="bg-green-400 text-white py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-lg font-bold mb-4">PawFinder</h4>
                            <p>
                                PawFinder is your dedicated platform for adopting homeless pets and helping reunite lost pets with their families.                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="hover:text-gray-300">
                                        Our Animals
                                    </a>
                                </li>
                                <li>
                                    <Link to='/guide' className="hover:text-gray-300">
                                        Adoption Starter Guide
                                    </Link>
                                </li>
                                <li>
                                    <Link to='about-us' className="hover:text-gray-300">
                                        About us
                                    </Link>
                                </li>
                                <a
                                    href="https://dari.four-paws.bg/s/?_ga=2.50020911.802577102.1630308141-1149300567.1591961121"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-gray-300"
                                >
                                    Support Four Paws
                                </a>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a href="mailto:pawfinder@abv.bg" className="hover:text-gray-300">
                                        pawfinder@abv.bg
                                    </a>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-4 ">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/groups/1472732316295842" className="hover:text-pink-500 ">
                                    <i className="fab fa-facebook fa-lg" />
                                </a>

                                <a href="https://www.instagram.com/four_paws_international/?hl=bg" className="hover:text-pink-500">
                                    <i className="fab fa-instagram fa-lg" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Link to='/'>© 2024 PawFinder. All rights reserved.</Link>
                        <p></p>
                    </div>
                </div>
            </footer>
        </>

    );
}