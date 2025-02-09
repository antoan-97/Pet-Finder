import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
export default function DogAdoptionCard({
    _id,
    name,
    breed,
    age,
    description,
    imgUrl,
    adopted
}) {
    const { t } = useTranslation();
    // Function to truncate description
    const truncateDescription = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    };

    return (
        <div className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
            <div className="relative h-64 overflow-hidden">
                {imgUrl && (
                    <>
                        <img 
                            src={imgUrl} 
                            alt={`${name} - ${breed}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                    
                )}
                {/* Adopted Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 text-sm font-semibold rounded-full ${
                    adopted ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                }`}>
                    {adopted ? t('adoptionDogCard.adopted') : t('adoptionDogCard.lookingForHome')}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h4 className="text-xl font-semibold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-300">
                        {name}
                    </h4>
                    <p className="text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {t('adoptionDogCard.breed')}: {breed}
                    </p>
                    <p className="text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {t('adoptionDogCard.age')}: {age}
                    </p>
                    {description && (
                        <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                            {t('adoptionDogCard.description')}: {truncateDescription(description, 100)}
                        </p>
                    )}
                </div>
                <Link 
                    to={`/adopt-dog/${_id.toString()}`}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors duration-300 mt-auto"
                >
                    {t('adoptionDogCard.viewDetails')}
                </Link>
            </div>
        </div>
    );
}