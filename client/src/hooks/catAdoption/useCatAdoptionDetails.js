import * as adoptionApi from '../../services/adoptionApi';
import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import  AuthContext  from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function useCatAdoptionDetails() {
    const { t } = useTranslation();
    const [state, setState] = useState({
        pet: null,
        isLoading: true,
        error: null,
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { userId } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchCat = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            const data = await adoptionApi.getOneCat(id);
            
            if (!data) {
                throw new Error('Cat not found');
            }

            setState(prev => ({
                ...prev,
                pet: data,
                isLoading: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err.message,
                isLoading: false
            }));
            navigate('/error-page');
        }
    }, [id, navigate]);

    useEffect(() => {
        if (id) {
            fetchCat();
        }
        return () => {
            setState({
                pet: null,
                isLoading: true,
                error: null
            });
        };
    }, [id, fetchCat]);

    const handleDelete = useCallback(async () => {
        try {
            await adoptionApi.deleteAdoptionCat(id);
            navigate('/cat-adoption');
        } catch (error) {
            console.error('Error deleting cat:', error);
            setState(prev => ({
                ...prev,
                error: 'Failed to delete cat'
            }));
        }
    }, [id, navigate]);

    const isOwner = userId === state.pet?.ownerId;

    return {
        pet: state.pet,
        isLoading: state.isLoading,
        error: state.error,
        isOwner,
        showDeleteModal,
        setShowDeleteModal,
        handleDelete,
        t
    };
}

