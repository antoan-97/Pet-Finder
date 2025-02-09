import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import * as adoptionApi from '../../../services/adoptionApi';
import Spinner from "../../common/Spinner";

export default function DogAdoptionUpdate() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        description: '',
        location: '',
        image: '',
        imgUrl: ''
    });

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const data = await adoptionApi.getOneDog(id);

                setFormData({
                    name: data.name || '',
                    breed: data.breed || '',
                    age: data.age || '',
                    description: data.description || '',
                    location: data.location || '',
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
                image: files[0],
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
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await adoptionApi.updateAdoptionDog(id, formDataToSend);
            navigate('/dog-adoption');
        } catch (error) {
            console.error('Update error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section className="bg-login-bg bg-cover bg-center pt-24 pb-24 px-4 h-full">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        {t('updateAdoption.titleDog')}
                    </h1>
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                {t('updateAdoption.name')}
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                        </div>
                        <div>
                            <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
                                {t('updateAdoption.breed')}
                            </label>
                            <input
                                type="text"
                                id="breed"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                        </div>
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                {t('updateAdoption.age')}
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                {t('updateAdoption.description')}
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                {t('updateAdoption.location')}
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('updateAdoption.currentImage')}
                            </label>
                            {formData.imgUrl && (
                                <img
                                    src={formData.imgUrl}
                                    alt="Current pet"
                                    className="mt-2 mb-4 w-full h-64 object-cover rounded-md"
                                />
                            )}
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('updateAdoption.newImage')}
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>



                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            {isLoading ? <Spinner /> : t('updateAdoption.submitButton')}
                        </button>
                    </form>
                </div>

            </div>
        </section>

    );
}