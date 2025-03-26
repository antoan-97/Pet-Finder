import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import * as adoptionApi from '../../services/adoptionApi';
import * as Yup from 'yup';

export default function useDogAdoptionUpdate() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
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
            .max(200, t('validations.max', { max: 30 }))
    });

    const validateField = async (name, value) => {
        try {
            const dataToValidate = {
                ...state.formData,
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

    const validateForm = async () => {
        try {
            await validationSchema.validate(state.formData, { abortEarly: false });
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

    const fetchPet = useCallback(async () => {
        try {
            const data = await adoptionApi.getOneDog(id);
            setState(prev => ({
                ...prev,
                formData: {
                    name: data.name || '',
                    breed: data.breed || '',
                    age: data.age || '',
                    description: data.description || '',
                    location: data.location || '',
                    image: '',
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
    }, [id, fetchPet]);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        const newValue = files ? files[0] : value;

        setState(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                [name]: newValue
            }
        }));

        setTimeout(() => validateField(name, newValue), 0);
    }, []);

    const handleUpdate = useCallback(async (e) => {
        e.preventDefault();
        
        const isValid = await validateForm();
        if (!isValid) return;

        setState(prev => ({ ...prev, isLoading: true }));
        
        try {
            const formDataToSend = new FormData();
            Object.entries(state.formData).forEach(([key, value]) => {
                if (key === 'image' && value instanceof File) {
                    formDataToSend.append('image', value);
                } else if (key !== 'imgUrl') {
                    formDataToSend.append(key, value);
                }
            });

            await adoptionApi.updateAdoptionDog(id, formDataToSend);
            navigate('/dog-adoption');
        } catch (error) {
            console.error('Update error:', error);
            setErrors(prev => ({
                ...prev,
                submit: error.message || t('errors.updateFailed')
            }));
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [id, state.formData, navigate, t]);

    return {
        formData: state.formData,
        isLoading: state.isLoading,
        errors,
        handleChange,
        handleUpdate,
        t
    };
} 