import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { useTranslation } from 'react-i18next';
import AuthContext from "../../contexts/AuthContext";
import * as adoptionApi from "../../services/adoptionApi";

export default function useDogAdoptionForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading();

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        description: '',
        location: '',
        image: null,
        adopted: false
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
                throw new Error('You must be logged in to add a dog');
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

            await adoptionApi.addAdoptionDog(form);
            navigate('/dog-adoption');
        } catch (error) {
            console.error('Failed to submit dog for adoption:', error);
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