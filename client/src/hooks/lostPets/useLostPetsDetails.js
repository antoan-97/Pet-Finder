import { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as petApi from '../../services/petApi';
import AuthContext from '../../contexts/AuthContext';

export default function useLostPetsDetails() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [state, setState] = useState({
        pet: null,
        loading: true,
        error: null
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { userId } = useContext(AuthContext);
    const { id } = useParams();

    const formatDate = useCallback((dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }; 
        return new Date(dateString).toLocaleDateString('en-US', options);
    }, []);

    const fetchPet = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true, error: null }));
            const data = await petApi.getOneLost(id);
            
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
            await petApi.deleteLostPet(id);
            navigate('/lost-pets');
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
        formatDate,
        t
    };
} 