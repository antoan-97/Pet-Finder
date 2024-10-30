import { Link } from "react-router-dom";

export default function LostPetsCard({
    _id,
    name,
    kind,
    breed,
    lastSeenLocation,
    lastSeenDate,
    phone,
    description,
    imgUrl,
}) {
    // Function to truncate description
    const truncateDescription = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
                {imgUrl && (
                    <>
                        <img 
                            src={imgUrl} 
                            alt={`${name} - ${kind}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                )}
            </div>
            <div className="p-6">
                <h4 className="text-xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                    {name} - {kind}
                </h4>
                <p className="text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    Breed: {breed}
                </p>
                <p className="text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    Last Seen: {new Date(lastSeenDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    Location: {lastSeenLocation}
                </p>
                {description && (
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                        Description: {truncateDescription(description, 100)}
                    </p>
                )}
                <p className="text-gray-700 font-semibold mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    Contact: {phone}
                </p>
                <Link 
                    to={`/pet/${_id.toString()}`}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}