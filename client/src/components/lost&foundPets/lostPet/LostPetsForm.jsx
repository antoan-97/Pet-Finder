import Spinner from "../../common/Spinner";
import useLostPetsForm from "../../../hooks/lostPets/useLostPetsForm";

export default function LostPetForm() {
    const {
        formData,
        isLoading,
        today,
        handleChange,
        handleSubmit,
        t,
        errors
    } = useLostPetsForm();

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
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.name')}<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.kind')}<span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="kind"
                                    value={formData.kind}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                    />
                                {errors.kind && (
                                    <p className="mt-1 text-sm text-red-500">{errors.kind}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.breed')}<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                            {errors.breed && (
                                <p className="mt-1 text-sm text-red-500">{errors.breed}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.lastSeenDate')}<span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="lastSeenDate"
                                    value={formData.lastSeenDate}
                                    onChange={handleChange}
                                    max={today}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                {errors.lastSeenDate && (
                                    <p className="mt-1 text-sm text-red-500">{errors.lastSeenDate}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.contact')}<span className="text-red-500">*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    required
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.lastSeenLocation')}<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="lastSeenLocation"
                                value={formData.lastSeenLocation}
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                            {errors.lastSeenLocation && (
                                <p className="mt-1 text-sm text-red-500">{errors.lastSeenLocation}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.description')}<span className="text-red-500">*</span></label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('lostPetsForm.uploadImage')}<span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                required
                            />
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                            )}
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
    );
}