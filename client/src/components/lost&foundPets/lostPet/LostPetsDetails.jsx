import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as petApi from '../../../services/petApi';

export default function LostPetsDetails() {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        if (id) {
            petApi.getOneLost(id)
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

    return(
        <div className="bg-custom-gradient min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-green-700 mb-6 border-b pb-4">Name - {pet.name}</h2>
                    {pet.imgUrl && (
                        <div className="mb-8 flex justify-center">
                            <img 
                                src={pet.imgUrl} 
                                alt={pet.breed} 
                                className="max-w-full max-h-[600px] object-contain rounded-lg shadow-md"
                            />
                        </div>
                    )}
                    <div className="space-y-4">
                        <p className="text-xl"><strong className="text-green-600">Last Seen Location:</strong> {pet.lastSeenLocation}</p>
                        <p className="text-xl">
                            <strong className="text-green-600">Last Seen Date:</strong> {formatDate(pet.lastSeenDate)}
                        </p>
                        <p className="text-xl"><strong className="text-green-600">Description:</strong> {pet.description}</p>
                        <p className="text-xl"><strong className="text-green-600">Contact:</strong> {pet.phone}</p>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Link 
                            to="/lost-pets" 
                            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            Back to Lost Pets
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}