import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../contexts/LoadingContext";
import { useTranslation } from 'react-i18next';

import AuthContext from "../../../contexts/AuthContext";
import Spinner from "../../common/Spinner";
import * as adoptionApi from "../../../services/adoptionApi";

export default function adoptionForm() {
    const navigate = useNavigate()
    const { userId } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading();
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        description: '',
        location: '',
        image: null,
        adopted: false
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!userId) {
                throw new Error('You must be logged in to add a dog');
            }

            const form = new FormData();
            form.append('name', formData.name);
            form.append('breed', formData.breed);
            form.append('age', formData.age);
            form.append('description', formData.description);
            form.append('location', formData.location);
            if (formData.image) {
                form.append('image', formData.image);
            }
            form.append('ownerId', userId.toString());


            const response = await adoptionApi.addAdoptionDog(form);
            navigate('/dog-adoption');
        } catch (error) {
            console.error('Failed to submit dog for adoption:', error);
            alert(error.message || 'Failed to submit pet information. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-login-bg bg-cover bg-center pt-24 pb-24 px-4 h-full">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        {t('adoptionForm.titleDog')}
                    </h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.name')}</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.breed')}</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.age')}</label>
                            <input
                                type="text"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.location')}</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.description')}</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.uploadImage')}</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}

                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            {isLoading ? <Spinner /> : t('adoptionForm.submitButton')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}