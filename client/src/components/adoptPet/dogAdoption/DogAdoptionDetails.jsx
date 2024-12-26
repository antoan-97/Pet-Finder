import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as adoptionApi from '../../../services/adoptionApi';

export default function DogAdoptionDetails() {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            adoptionApi.getOneDog(id)
                .then(data => {
                    setPet(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">Error: {error}</div>;
    if (!pet) return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">No pet found</div>;

    return (
        <div className="bg-custom-gradient min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-black mb-6 border-b pb-4">Name - {pet.name}</h2>
                    {pet.imgUrl && (
                        <div className="mb-8 flex justify-center">
                            <img
                                src={pet.imgUrl}
                                alt={pet.name}
                                className="max-w-full max-h-[600px] object-contain rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="space-y-4">
                        <p className="text-xl"><strong className="text-black">Breed:</strong> {pet.breed}</p>
                        <p className="text-xl">
                            <strong className="text-black">Age:</strong> {pet.age}  
                        </p>
                        <p className="text-xl"><strong className="text-black">Location:</strong> {pet.location}</p>
                        <p className="text-xl"><strong className="text-black">Description:</strong> {pet.description}</p>
                        <p className="text-xl"><strong className="text-black">Contact:</strong> {pet.phone}</p>
                    </div>
            <div className="mt-8 flex justify-center">
                <Link
                    to="/dog-adoption"
                    className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                    Back to Adoption Dogs
                </Link>
            </div>
        </div>
    );
}
