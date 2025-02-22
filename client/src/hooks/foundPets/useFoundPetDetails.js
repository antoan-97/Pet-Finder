import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as petApi from '../../services/petApi';
import AuthContext from '../../contexts/AuthContext';

export default function useFoundPetDetails() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [state, setState] = useState({
        pet: null,
        loading: true,
        error: null
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { id } = useParams();
    const { userId } = useContext(AuthContext);

    const fetchPet = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const data = await petApi.getOneFound(id);
            
            if (!data) {
                throw new Error('Pet not found');
            }

            setState(prev => ({
                ...prev,
                pet: data,
                loading: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: err.message,
                loading: false
            }));
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchPet();
        }

        // Cleanup function
        return () => {
            setState({
                pet: null,
                loading: true,
                error: null
            });
        };
    }, [id, fetchPet]);

    const handleDelete = useCallback(async () => {
        try {
            await petApi.deleteFoundPet(id);
            navigate('/found-pets');
        } catch (error) {
            console.error('Error deleting pet:', error);
            setState(prev => ({
                ...prev,
                error: 'Failed to delete pet'
            }));
        }
    }, [id, navigate]);

    const isOwner = userId === state.pet?.ownerId;

    return {
        pet: state.pet,
        loading: state.loading,
        error: state.error,
        isOwner,
        showDeleteModal,
        setShowDeleteModal,
        handleDelete,
        t
    };
} 