import { useTranslation } from 'react-i18next';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const { t } = useTranslation();
    
    
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (pageNumber) => {
        
        
        // First change the page
        onPageChange(pageNumber);
        
        // Then force scroll to top immediately
        window.scrollTo({
            top: 0,
            behavior: 'instant' // Use instant instead of smooth
        });
        
        // Backup scroll for reliability
        requestAnimationFrame(() => {
            window.scrollTo(0, 0);
        });
    };

    return (
        <div className="flex justify-center items-center space-x-2 my-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                    currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                {t('pagination.previous')}
            </button>

            <div className="flex space-x-1">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === page
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                    currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
            >
                {t('pagination.next')}
            </button>
        </div>
    );
};

export default Pagination; 