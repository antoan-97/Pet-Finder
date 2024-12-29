import { Link } from "react-router-dom";

export default function FoundPetCard({ _id, kind, location, breed, phone, description, imgUrl }) {
    // Function to truncate description
    const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
            {/* Image container with aspect ratio */}
            <div className="relative pt-[75%]"> {/* This creates a 4:3 aspect ratio */}
                <img
                    src={imgUrl || defaultDogImage}
                    alt={breed}
                    className="absolute top-0 left-0 w-full h-full object-contain bg-gray-100"
                />
            </div>
            
            {/* Content container with flex-grow */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Pet info */}
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{breed}</h3>
                    <p className="text-gray-600 mb-2"><strong>Location:</strong> {location}</p>
                    <p className="text-gray-600 mb-2"><strong>Description:</strong> {description}</p>
                </div>
                
                {/* Button container - always at bottom */}
                <div className="mt-4">
                    <Link
                        to={`/found-pets/${_id}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-full inline-block text-center hover:bg-green-700 transition-colors duration-300"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}
