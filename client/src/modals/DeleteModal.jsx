import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

export default function DeleteModal({ onClose, onConfirm, message }) {
    const { t } = useTranslation();
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <h3 className="text-xl font-semibold mb-4">{t('deleteModal.title')}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        {t('deleteModal.cancel')}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        {t('deleteModal.delete')}
                    </button>
                </div>
            </div>
        </div>
    );
}