import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { useTranslation } from "react-i18next";
import AuthContext from "../../contexts/AuthContext";
import * as petApi from "../../services/petApi";
import * as yup from 'yup';

export default function useFoundPetForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading();

    const [errors, setErrors] = useState({});

    const validationSchema = yup.object().shape({
        kind: yup.string()
            .required(t('validations.required'))
            .min(2, t('validations.min', { min: 2 }))
            .max(30, t('validations.max', { max: 30 })),
        location: yup.string()
            .required(t('validations.required'))
            .min(2, t('validations.min', { min: 2 }))
            .max(30, t('validations.max', { max: 30 })),
        breed: yup.string()
            .required(t('validations.required'))
            .min(2, t('validations.min', { min: 2 }))
            .max(30, t('validations.max', { max: 30 })),
        phone: yup.string()
            .required(t('validations.required'))
            .matches(/^\+?[\d\s-]{8,}$/, t('validations.phoneInvalid')),
        description: yup.string()
            .min(3, t('validations.min', { min: 2 }))
            .max(200, t('validations.max', { max: 200 }))
            .optional(),
        image: yup.mixed()
            .required(t('validations.imageRequired'))
    });

    const [formData, setFormData] = useState({
        kind: '',
        location: '',
        breed: '',
        phone: '',
        description: '',
        image: null,
        ownerId: userId
    });

    const validateField = useCallback(async (name, value) => {
        try {
            await validationSchema.validateAt(name, { [name]: value });
            setErrors(prev => ({ ...prev, [name]: '' }));
            return true;
        } catch (error) {
            setErrors(prev => ({ ...prev, [name]: error.message }));
            return false;
        }
    }, [validationSchema]);

    const validateForm = useCallback(async (data) => {
        try {
            await validationSchema.validate(data, { abortEarly: false });
            setErrors({});
            return true;
        } catch (error) {
            const newErrors = {};
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            return false;
        }
    }, [validationSchema]);

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        const newValue = files ? files[0] : value;

        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));

        validateField(name, newValue);
    }, [validateField]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const isValid = await validateForm(formData);
        if (!isValid) return;

        setIsLoading(true);

        try {
            if (!userId) {
                throw new Error(t('errors.loginRequired'));
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
            setErrors(prev => ({
                ...prev,
                submit: error.message || t('errors.submitFailed')
            }));
        } finally {
            setIsLoading(false);
        }
    }, [formData, userId, navigate, setIsLoading, validateForm, t]);

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
        t
    };
} 