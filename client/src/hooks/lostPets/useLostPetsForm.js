import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { useTranslation } from "react-i18next";
import AuthContext from "../../contexts/AuthContext";
import * as petApi from "../../services/petApi";

export default function useLostPetsForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading();

    const [formData, setFormData] = useState({
        name: '',
        kind: '',
        breed: '',
        lastSeenLocation: '',
        lastSeenDate: '',
        phone: '',
        description: '',
        image: null,
        ownerId: userId
    });

    const today = new Date().toISOString().split('T')[0];

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        
        if (name === 'lastSeenDate') {
            const formattedDate = new Date(value);
            formattedDate.setHours(12, 0, 0, 0);
            setFormData(prevState => ({
                ...prevState,
                [name]: formattedDate.toISOString().split('T')[0]
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: files ? files[0] : value
            }));
        }
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const submissionData = { ...formData };
            if (submissionData.lastSeenDate) {
                const date = new Date(submissionData.lastSeenDate);
                date.setHours(12, 0, 0, 0);
                submissionData.lastSeenDate = date.toISOString();
            }

            const response = await petApi.addLostPet(submissionData);
            navigate('/lost-pets');
            setFormData({
                name: '',
                kind: '',
                breed: '',
                lastSeenLocation: '',
                lastSeenDate: '',
                phone: '',
                description: '',
                image: null,
            });
        } catch (error) {
            console.error('Failed to report pet:', error);
            throw new Error(error.message || 'Failed to submit pet information. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [formData, navigate, setIsLoading]);

    return {
        formData,
        isLoading,
        today,
        handleChange,
        handleSubmit,
        t
    };
} 