import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import * as petApi from '../../../services/petApi';
import AuthContext from '../../../contexts/AuthContext';
import DeleteModal from '../../../modals/DeleteModal';

export default function FoundPetDetails() {
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { userId } = useContext(AuthContext);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    useEffect(() => {
        if (id) {
            petApi.getOneFound(id)
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

    const handleDelete = async () => {
        try {
            await petApi.deleteFoundPet(id);
            navigate('/found-pets');
        } catch (error) {
            console.error('Error deleting dog:', error);
            setError('Failed to delete dog');
        }
    };


    if (loading) return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">Loading...</div>;
    if (error) return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">Error: {error}</div>;
    if (!pet) return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">No pet found</div>;
    const isOwner = userId === pet?.ownerId;

    return (
        <div className="bg-custom-gradient min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-black mb-6 border-b pb-4">Breed - {pet.breed}</h2>
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
                        <p className="text-xl"><strong className="text-black">Location:</strong> {pet.location}</p>
                        <p className="text-xl"><strong className="text-black">Description:</strong> {pet.description}</p>
                        <p className="text-xl"><strong className="text-black">Contact:</strong> {pet.phone}</p>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Link
                            to="/found-pets"
                            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            Back to Found Pets
                        </Link>
                    </div>
                    {isOwner && (
                        <div className="mt-8 flex justify-center gap-2">
                            <Link
                                to={`/dog-adoption/${pet._id}/edit`}
                                className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    {showDeleteModal && (
                        <DeleteModal
                            onClose={() => setShowDeleteModal(false)}
                            onConfirm={handleDelete}
                            message="Are you sure you want to delete this dog?"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
