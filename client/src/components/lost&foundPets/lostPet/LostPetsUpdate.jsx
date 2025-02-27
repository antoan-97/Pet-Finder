import Spinner from "../../common/Spinner";
import useLostPetsUpdate from "../../../hooks/lostPets/useLostPetsUpdate";

export default function LostPetsUpdate() {
    const {
        formData,
        isLoading,
        error,
        handleChange,
        handleUpdate,
        t
    } = useLostPetsUpdate();

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