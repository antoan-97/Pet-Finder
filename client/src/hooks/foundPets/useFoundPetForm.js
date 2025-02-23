import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { useTranslation } from "react-i18next";
import AuthContext from "../../contexts/AuthContext";
import * as petApi from "../../services/petApi";

export default function useFoundPetForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading();

    const [formData, setFormData] = useState({
        kind: '',
        location: '',
        breed: '',
        phone: '',
        description: '',
        image: null,
        ownerId: userId
    });

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            if (!userId) {
                throw new Error('You must be logged in to report a found pet');
            }

            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'image' && value) {
                    form.append('image', value);
                } else if (key !== 'image') {
                    form.append(key, value);
                }
            });
            form.append('ownerId', userId.toString());

            await petApi.addFoundPet(form);
            navigate('/found-pets');
        } catch (error) {
            console.error('Failed to report pet:', error);
            throw new Error(error.message || 'Failed to submit pet information. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [formData, userId, navigate, setIsLoading]);

    return {
        formData,
        isLoading,
        handleChange,
        handleSubmit,
        t
    };
} 