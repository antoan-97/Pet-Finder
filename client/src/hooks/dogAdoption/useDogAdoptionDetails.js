import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as adoptionApi from '../../services/adoptionApi';
import AuthContext from '../../contexts/AuthContext';

export default function useDogAdoptionDetails() {
    const { t } = useTranslation();
    const [state, setState] = useState({
        pet: null,
        isLoading: true,
        error: null
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { userId } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchDog = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, isLoading: true, error: null }));
            const data = await adoptionApi.getOneDog(id);
            
            if (!data) {
                throw new Error('Dog not found');
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
            fetchDog();
        }
        
        return () => {
            setState({
                pet: null,
                isLoading: true,
                error: null
            });
        };
    }, [id, fetchDog]);

    const handleDelete = useCallback(async () => {
        try {
            await adoptionApi.deleteAdoptionDog(id);
            navigate('/dog-adoption');
        } catch (error) {
            console.error('Error deleting dog:', error);
            setState(prev => ({
                ...prev,
                error: 'Failed to delete dog'
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