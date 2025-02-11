import React, { useState, useContext } from "react";
import { addFoundPet } from "../../../services/petApi";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../../contexts/LoadingContext";
import { useTranslation } from "react-i18next";
import AuthContext from "../../../contexts/AuthContext";
import Spinner from "../../common/Spinner";

export default function FoundPetForm() {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const { userId } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        kind: '',
        location: '',
        breed: '',
        phone: '',
        description: '',
        image: null,
        ownerId: userId
    });

    const { isLoading, setIsLoading } = useLoading();

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
            const response = await addFoundPet(formData);
            navigate('/found-pets')
            setFormData({
                kind: '',
                location: '',
                breed: '',
                phone: '',
                description: '',
                image: null,
                ownerId: userId
            });
        } catch (error) {
            console.error('Failed to report pet:', error);
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
                        {t('foundPetsForm.title')}
                    </h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('foundPetsForm.kind')}</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('foundPetsForm.breed')}</label>
                                <input
                                    type="text"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('foundPetsForm.location')}</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('foundPetsForm.contact')}</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('foundPetsForm.description')}</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('foundPetsForm.uploadImage')}</label>
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
                            {isLoading ? <Spinner /> : t('foundPetsForm.submitButton')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

