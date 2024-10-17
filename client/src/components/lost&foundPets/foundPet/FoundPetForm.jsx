import { useState } from "react";
import { addFoundPet } from "../../../services/api";

export default function FoundPetForm() {
    const [formData, setFormData] = useState({
        kind: '',
        location: '',
        breed: '',
        phone: '',
        description: '',
        image: null,
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Log the formData to check if the image is present
        console.log('Form data before submission:', formData);

        try {
            const response = await addFoundPet(formData);
            if (response.success) {
                alert('Pet information submitted successfully!');
                // Reset the form here
                setFormData({
                    kind: '',
                    location: '',
                    breed: '',
                    phone: '',
                    description: '',
                    image: null,
                });
            } else {
                throw new Error(response.message || 'Failed to submit pet information');
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'An error occurred while submitting the form');
        }
    };

    return (
        <section className="bg-login-bg bg-cover bg-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-50 dark:border-white-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray">
                            Add Found Pet
                        </h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 md:space-y-6">
                            {error && <p className="text-red-500">{error}</p>}
                            <div>
                                <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray">Pet Kind</label>
                                <input
                                    type="text"
                                    name="kind"
                                    value={formData.kind}
                                    onChange={handleChange}
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray">Breed</label>
                                <input
                                    type="text"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-400"
                                />
                            </div>
                            <div>
                                <label htmlFor="image">Upload Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
