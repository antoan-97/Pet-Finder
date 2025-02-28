import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import * as adoptionApi from '../../services/adoptionApi';

export default function useCatAdoptionUpdate() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
        isLoading: false,
        error: null,
        formData: {
            name: '',
            breed: '',
            age: '',
            description: '',
            location: '',
            image: '',
            imgUrl: ''
        }
    });

    const fetchPet = useCallback(async () => {
        try {
            const data = await adoptionApi.getOneCat(id);
            setState(prev => ({
                ...prev,
                formData: {
                    name: data.name || '',
                    breed: data.breed || '',
                    age: data.age || '',
                    description: data.description || '',
                    location: data.location || '',
                    image: data.image || '',
                    imgUrl: data.imgUrl || ''
                }
            }));
        } catch (err) {
            console.error('Error fetching pet:', err);
            setState(prev => ({ ...prev, error: err.message }));
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchPet();
        }
        
        return () => {
            setState({
                isLoading: false,
                error: null,
                formData: {
                    name: '',
                    breed: '',
                    age: '',
                    description: '',
                    location: '',
                    image: '',
                    imgUrl: ''
                }
            });
        };
    }, [id, fetchPet]);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setState(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                [name]: files ? files[0] : value
            }
        }));
    }, []);

    const handleUpdate = useCallback(async (e) => {
        e.preventDefault();
        setState(prev => ({ ...prev, isLoading: true }));
        
        try {
            const formDataToSend = new FormData();
            Object.entries(state.formData).forEach(([key, value]) => {
                if (key === 'image' && value instanceof File) {
                    formDataToSend.append('image', value);
                } else {
                    formDataToSend.append(key, value);
                }
            });

            await adoptionApi.updateAdoptionCat(id, formDataToSend);
            navigate('/cat-adoption');
        } catch (error) {
            console.error('Update error:', error);
            setState(prev => ({ ...prev, error: error.message }));
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [id, state.formData, navigate]);

    return {
        formData: state.formData,
        isLoading: state.isLoading,
        error: state.error,
        handleChange,
        handleUpdate,
        t
    };
} 