import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { addLostPet } from "../../../services/petApi";
import { useLoading } from "../../../contexts/LoadingContext";
import { useTranslation } from "react-i18next";
import Spinner from "../../common/Spinner";

import AuthContext from "../../../contexts/AuthContext";

export default function LostPetForm() {
    const navigate = useNavigate()
    const { t } = useTranslation();
    const { userId } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading();
    const [formData, setFormData] = useState({
        name: '',
        kind: '',
        breed: '',
        lastSeenLocation: '',
        lastSeenDate: '',
        phone: '',
        description: '',
        image: null,
        ownerId: userId
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        
        // Format the date when it's selected
        if (name === 'lastSeenDate') {
            const formattedDate = new Date(value);
            formattedDate.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
            setFormData(prevState => ({
                ...prevState,
                [name]: formattedDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Create a new FormData object with the formatted date
            const submissionData = { ...formData };
            if (submissionData.lastSeenDate) {
                const date = new Date(submissionData.lastSeenDate);
                date.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues
                submissionData.lastSeenDate = date.toISOString();
            }

            const response = await addLostPet(submissionData);
            navigate('/lost-pets')
            setFormData({
                name: '',
                kind: '',
                breed: '',
                lastSeenLocation: '',
                lastSeenDate: '',
                phone: '',
                description: '',
                image: null,
            });
        } catch (error) {
            console.error('Failed to report pet:', error);
            alert(error.message || 'Failed to submit pet information. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // Get today's date for max attribute
    const today = new Date().toISOString().split('T')[0];

    return (
        <section className="bg-login-bg bg-cover bg-center pt-24  px-4 h-screen">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        {t('lostPetsForm.title')}
                    </h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.name')}</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.kind')}</label>
                                <input
                                    type="text"
                                    name="kind"
                                    value={formData.kind}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.breed')}</label>
                            <input
                                type="text"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.lastSeenDate')}</label>
                                <input
                                    type="date"
                                    name="lastSeenDate"
                                    value={formData.lastSeenDate}
                                    onChange={handleChange}
                                    max={today} // Prevent future dates
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.contact')}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.lastSeenLocation')}</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.description')}</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.uploadImage')}</label>
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
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? <Spinner /> : t('lostPetsForm.submitButton')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}