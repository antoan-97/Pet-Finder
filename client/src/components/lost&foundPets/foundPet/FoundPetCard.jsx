import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FoundPetCard({ _id, kind, location, breed, phone, description, imgUrl }) {
    const { t } = useTranslation();
    const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="group bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
                {imgUrl && (
                    <>
                        <img
                            src={imgUrl || defaultDogImage}
                            alt={breed}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                )}
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{breed}</h3>
                    <p className="text-gray-600 mb-2 text-left"><strong>{t('foundPetsCard.location')}:</strong> {location}</p>
                    <p className="text-gray-600 mb-2 text-left"><strong>{t('foundPetsCard.description')}:</strong> {truncateDescription(description, 100)}</p>
                </div>
                
                <div className="mt-4">
                    <Link
                        to={`/found-pets/${_id}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-full inline-block text-center hover:bg-green-700 transition-colors duration-300"
                    >
                        {t('foundPetsCard.viewDetails')}
                    </Link>
                </div>
            </div>
        </div>
    )
}
