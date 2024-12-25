import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as adoptionApi from "../../../services/adoptionApi";

export default function DogAdoptionForm() {
    const navigate = useNavigate()
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
        
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('breed', formData.breed);
        submitData.append('age', formData.age);
        submitData.append('description', formData.description);
        submitData.append('location', formData.location);
        submitData.append('image', formData.image);
        submitData.append('adopted', formData.adopted);

        try {
            const response = await adoptionApi.addAdoptionDog(submitData);
            console.log('Server response:', response);
            navigate('/dog-adoption');
            setFormData({
                name: '',
                breed: '',
                age: '',
                description: '',
                location: '',
                image: null,
                adopted: false,
            });
        } catch (error) {
            console.error('Failed to submit dog for adoption:', error);
            alert(error.message || 'Failed to submit pet information. Please try again.');
        }
    }


    return (
        <section className="bg-login-bg bg-cover bg-center py-12 h-full">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Add Dog for Adoption
                    </h1>
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Breed</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full p-2 text-sm border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
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
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}