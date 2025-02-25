import { Link } from 'react-router-dom';
import DeleteModal from '../../../modals/DeleteModal';
import useLostPetsDetails from '../../../hooks/lostPets/useLostPetsDetails';

export default function LostPetsDetails() {
    const {
        pet,
        loading,
        error,
        isOwner,
        showDeleteModal,
        setShowDeleteModal,
        handleDelete,
        formatDate,
        t
    } = useLostPetsDetails();

    if (loading) {
        return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">Error: {error}</div>;
    }

    if (!pet) {
        return <div className="bg-custom-gradient min-h-screen flex items-center justify-center">No pet found</div>;
    }

    return (
        <div className="bg-custom-gradient min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-black mb-6 border-b pb-4">
                        {t('lostPetsCard.name')} - {pet.name}
                    </h2>
                    
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
                        <p className="text-xl">
                            <strong className="text-black">{t('lostPetsCard.lastSeenLocation')}:</strong> {pet.lastSeenLocation}
                        </p>
                        <p className="text-xl">
                            <strong className="text-black">{t('lostPetsCard.lastSeenDate')}:</strong> {formatDate(pet.lastSeenDate)}
                        </p>
                        <p className="text-xl">
                            <strong className="text-black">{t('lostPetsCard.description')}:</strong> {pet.description}
                        </p>
                        <p className="text-xl">
                            <strong className="text-black">{t('lostPetsCard.contact')}:</strong> {pet.phone}
                        </p>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Link 
                            to="/lost-pets" 
                            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            {t('lostPetsCard.backToLostPets')}
                        </Link>
                    </div>

                    {isOwner && (
                        <div className="mt-8 flex justify-center gap-2">
                            <Link
                                to={`/lost-pet/${pet._id}/edit`}
                                className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                {t('lostPetsCard.edit')}
                            </Link>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                {t('lostPetsCard.delete')}
                            </button>
                        </div>
                    )}

                    {showDeleteModal && (
                        <DeleteModal
                            onClose={() => setShowDeleteModal(false)}
                            onConfirm={handleDelete}
                            message={t('lostPetsCard.deleteMessage')}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}