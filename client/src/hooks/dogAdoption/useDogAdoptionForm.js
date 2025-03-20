import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { useTranslation } from 'react-i18next';
import AuthContext from "../../contexts/AuthContext";
import * as adoptionApi from "../../services/adoptionApi";
import * as Yup from 'yup';

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
    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required(t('validations.required'))
            .min(2, t('validations.min', { min: 2 }))
            .max(30, t('validations.max', { max: 30 })),
        location: Yup.string()
            .required(t('validations.required'))
            .min(2, t('validations.min', { min: 2 }))
            .max(30, t('validations.max', { max: 30 })),
        breed: Yup.string()
            .required(t('validations.required'))
            .min(2, t('validations.min', { min: 2 }))
            .max(30, t('validations.max', { max: 30 })),
        age: Yup.number()
            .typeError(t('validations.mustBeNumber'))
            .min(0, t('validations.min', { min: 0 }))
            .max(30, t('validations.max', { max: 30 })),
        description: Yup.string()
            .min(3, t('validations.min', { min: 2 }))
            .max(200, t('validations.max', { max: 30 })),
        image: Yup.mixed()
            .required(t('validations.required'))
    });

    const validateField = async (name, value) => {
        try {
            const dataToValidate = {
                ...formData,
                [name]: value
            };

            await validationSchema.validateAt(name, dataToValidate);
            
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                [error.path]: error.message
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = files ? files[0] : value;

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        setTimeout(() => validateField(name, newValue), 0);
    };

    const validateForm = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            return true;
        } catch (error) {
            const validationErrors = {};
            error.inner.forEach(err => {
                validationErrors[err.path] = err.message;
            });
            setErrors(validationErrors);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isValid = await validateForm();
        if (!isValid) return;

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
            setErrors(prev => ({
                ...prev,
                submit: error.message || 'Failed to submit pet information. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
        t
    };
} 