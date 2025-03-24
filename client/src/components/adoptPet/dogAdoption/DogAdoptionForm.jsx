import Spinner from "../../common/Spinner";
import useDogAdoptionForm from "../../../hooks/dogAdoption/useDogAdoptionForm";

export default function DogAdoptionForm() {
    const {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
        t
    } = useDogAdoptionForm();

    return (
        <section className="bg-login-bg bg-cover bg-center pt-24 pb-24 px-4 h-full">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        {t('adoptionForm.titleDog')}
                    </h1>
                    {errors.submit && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                            {errors.submit}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.name')}<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-2 text-sm border ${errors.name ? 'border-red-500' : 'border-green-300'} rounded-lg focus:ring-green-500 focus:border-green-500`}
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.breed')}<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                className={`w-full p-2 text-sm border ${errors.breed ? 'border-red-500' : 'border-green-300'} rounded-lg focus:ring-green-500 focus:border-green-500`}
                                required
                            />
                            {errors.breed && (
                                <p className="mt-1 text-sm text-red-500">{errors.breed}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.age')}</label>
                            <input
                                type="text"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className={`w-full p-2 text-sm border ${errors.age ? 'border-red-500' : 'border-green-300'} rounded-lg focus:ring-green-500 focus:border-green-500`}
                            />
                            {errors.age && (
                                <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.location')}<span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className={`w-full p-2 text-sm border ${errors.location ? 'border-red-500' : 'border-green-300'} rounded-lg focus:ring-green-500 focus:border-green-500`}
                                required
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.description')}<span className="text-red-500">*</span></label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className={`w-full p-2 text-sm border ${errors.description ? 'border-red-500' : 'border-green-300'} rounded-lg focus:ring-green-500 focus:border-green-500`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('adoptionForm.uploadImage')}<span className="text-red-500">*</span></label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className={`w-full p-2 text-sm border ${errors.image ? 'border-red-500' : 'border-green-300'} rounded-lg focus:ring-green-500 focus:border-green-500`}
                                required
                            />
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                            )}
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
    );
}