import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spinner from "../../common/Spinner";
import * as petApi from '../../../services/petApi';

export default function LostPetsUpdate() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        kind: '',
        breed: '',
        lastSeenLocation: '',
        lastSeenDate: '',
        phone: '',
        description: '',
        image: '',
        imgUrl: ''
    });

    // Fetch pet data when component mounts
    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await petApi.getOneLost(id);
                
                // Format the date to YYYY-MM-DD
                const formattedDate = data.lastSeenDate 
                    ? new Date(data.lastSeenDate).toISOString().split('T')[0]
                    : '';

                setFormData({
                    kind: data.kind || '',
                    breed: data.breed || '',
                    lastSeenLocation: data.lastSeenLocation || '',
                    lastSeenDate: formattedDate,
                    phone: data.phone || '',
                    description: data.description || '',
                    image: data.image || '',
                    imgUrl: data.imgUrl || ''
                });
            } catch (err) {
                console.error('Error fetching pet:', err);
                setError(err.message);
            }
        };

        if (id) {
            fetchPet();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'image' && formData[key] instanceof File) {
                    formDataToSend.append('image', formData[key]);
                } else if (key !== 'image') {
                    formDataToSend.append(key, formData[key]);
                }
            });

            await petApi.updateLostPet(id, formDataToSend);
            navigate('/lost-pets');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="bg-login-bg bg-cover bg-center pt-24 pb-24 px-4 h-full">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        {t('updateLostPets.title')}
                    </h1>
                    <form onSubmit={handleUpdate} encType="multipart/form-data" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('updateLostPets.kind')}</label>
                                <input
                                    type="text"
                                    name="kind"
                                    value={formData.kind}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('updateLostPets.breed')}</label>
                                <input
                                    type="text"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('updateLostPets.lastSeenLocation')}</label>
                                <input
                                    type="text"
                                    name="lastSeenLocation"
                                    value={formData.lastSeenLocation}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>  
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('updateLostPets.lastSeenDate')}</label>
                                <input
                                    type="date"
                                    name="lastSeenDate"
                                    value={formData.lastSeenDate}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('updateLostPets.contact')}</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('updateLostPets.description')}</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">{t('updateLostPets.currentImage')}</label>
                            {formData.imgUrl && (
                                <img
                                    src={formData.imgUrl}
                                    alt="Current pet"
                                    className="mt-2 mb-4 w-full h-64 object-cover rounded-md"
                                />
                            )}
                            <label className="block text-sm font-medium text-gray-700">{t('updateLostPets.newImage')}</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            {isLoading ? <Spinner /> : t('updateLostPets.submitButton')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}