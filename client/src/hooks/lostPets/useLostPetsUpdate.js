import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import * as petApi from '../../services/petApi';
import * as yup from 'yup';

export default function useLostPetsUpdate() {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [state, setState] = useState({
        isLoading: false,
        error: null,
        formData: {
            name: '',
            kind: '',
            breed: '',
            lastSeenLocation: '',
            lastSeenDate: '',
            phone: '',
            description: '',
            image: '',
            imgUrl: ''
        }
    });

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required(t('validations.required'))
            .min(1, t('validation.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 })),
        kind: yup.string()
            .required(t('validations.required'))
            .min(1, t('validation.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 })),
        breed: yup.string()
            .required(t('validations.required'))
            .min(1, t('validations.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 })),
        lastSeenLocation: yup.string()
            .required(t('validations.required'))
            .min(1, t('validations.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 })),
        lastSeenDate: yup.date()
            .required(t('validations.required'))
            .max(new Date(), t('validations.futureDate')),
        phone: yup.string()
            .required(t('validations.required'))
            .min(1, t('validations.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 }))
            .matches(/^\+?[\d\s-]{8,}$/, t('validations.phoneInvalid')),
        description: yup.string()
            .min(3, t('validations.min', { min: 3 }))
            .max(200, t('validations.max', { max: 200 }))
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
            const data = await petApi.getOneLost(id);
            
            const formattedDate = data.lastSeenDate 
                ? new Date(data.lastSeenDate).toISOString().split('T')[0]
                : '';

            setState(prev => ({
                ...prev,
                formData: {
                    name: data.name || '',
                    kind: data.kind || '',
                    breed: data.breed || '',
                    lastSeenLocation: data.lastSeenLocation || '',
                    lastSeenDate: formattedDate,
                    phone: data.phone || '',
                    description: data.description || '',
                    image: '',
                    imgUrl: data.imgUrl || ''
                }
            }));
        } catch (err) {
            console.error('Error fetching pet:', err);
            setErrors(prev => ({
                ...prev,
                submit: err.message || t('errors.fetchFailed')
            }));
        }
    }, [id, t]);

    useEffect(() => {
        if (id) {
            fetchPet();
        }
    }, [id, fetchPet]);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        
        if (name === 'lastSeenDate') {
            const formattedDate = new Date(value);
            formattedDate.setHours(12, 0, 0, 0);
            const newValue = formattedDate.toISOString().split('T')[0];
            setState(prev => ({
                ...prev,
                formData: {
                    ...prev.formData,
                    [name]: newValue
                }
            }));
            validateField(name, formattedDate);
        } else {
            const newValue = files ? files[0] : value;
            setState(prev => ({
                ...prev,
                formData: {
                    ...prev.formData,
                    [name]: newValue
                }
            }));
            validateField(name, newValue);
        }
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

            await petApi.updateLostPet(id, formDataToSend);
            navigate('/lost-pets');
        } catch (error) {
            console.error('Update error:', error);
            setErrors(prev => ({
                ...prev,
                submit: error.message || t('errors.updateFailed')
            }));
        } finally {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [id, state.formData, navigate, validateForm, t]);

    return {
        formData: state.formData,
        isLoading: state.isLoading,
        errors,
        handleChange,
        handleUpdate,
        t
    };
} 