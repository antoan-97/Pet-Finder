import { Link } from 'react-router-dom';
import DeleteModal from '../../../modals/DeleteModal';
import Spinner from '../../common/Spinner';
import useDogAdoptionDetails from '../../../hooks/dogAdoption/useDogAdoptionDetails';

export default function DogAdoptionDetails() {
    const {
        pet,
        isLoading,
        error,
        isOwner,
        showDeleteModal,
        setShowDeleteModal,
        handleDelete,
        t
    } = useDogAdoptionDetails();

    if (isLoading) return <Spinner />;
    if (error || !pet) return null;

    return (
        <div className="bg-custom-gradient min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-black mb-6 border-b pb-4">
                        {t('adoptionCard.name')} - {pet.name}
                    </h2>
                    
                    {pet.imgUrl && (
                        <div className="mb-8 flex justify-center">
                            <img
                                src={pet.imgUrl}
                                alt={pet.name}
                                className="max-w-full max-h-[600px] object-contain rounded-lg shadow-md"
                            />
                        </div>
                    )}
                    
                    <div className="space-y-4">
                        <p className="text-xl">
                            <strong className="text-black">{t('adoptionCard.breed')}:</strong> {pet.breed}
                        </p>
                        <p className="text-xl">
                            <strong className="text-black">{t('adoptionCard.age')}:</strong> {pet.age}
                        </p>
                        <p className="text-xl">
                            <strong className="text-black">{t('adoptionCard.location')}:</strong> {pet.location}
                        </p>
                        <p className="text-xl">
                            <strong className="text-black">{t('adoptionCard.description')}:</strong> {pet.description}
                        </p>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <Link
                            to="/dog-adoption"
                            className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            {t('adoptionCard.backButton')}
                        </Link>
                    </div>

                    {isOwner && (
                        <div className="mt-8 flex justify-center gap-2">
                            <Link
                                to={`/adopt-dog/${pet._id}/edit`}
                                className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                {t('adoptionCard.editButton')}
                            </Link>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                            >
                                {t('adoptionCard.deleteButton')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDelete}
                    message={t('deleteModal.deleteMessage')}
                />
            )}
        </div>
    );
}
