import { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { useTranslation } from "react-i18next";
import AuthContext from "../../contexts/AuthContext";
import * as petApi from "../../services/petApi";
import * as yup from 'yup';

export default function useLostPetsForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading();
    const [errors, setErrors] = useState({});

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required(t('validation.required'))
            .min(1, t('validation.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 })),
        kind: yup.string()
            .required(t('validation.required'))
            .min(1, t('validation.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 })),
        breed: yup.string()
            .required(t('validation.required'))
            .min(1, t('validation.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 })),
        lastSeenLocation: yup.string()
            .required(t('validation.required'))
            .min(1, t('validation.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 })),
        lastSeenDate: yup.date()
            .required(t('validation.required'))
            .max(new Date(), t('validation.futureDate')),
        phone: yup.string()
            .required(t('validation.required'))
            .min(1, t('validation.min', { min: 1 }))
            .max(20, t('validation.max', { max: 20 }))
            .matches(/^\+?[\d\s-]{8,}$/, t('validation.phoneInvalid')),
        description: yup.string()
            .min(3, t('validation.min', { min: 3 }))
            .max(200, t('validation.max', { max: 200 })),
        image: yup.mixed()
            .required(t('validation.imageRequired'))
    });

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

    const today = new Date().toISOString().split('T')[0];

    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        
        if (name === 'lastSeenDate') {
            const formattedDate = new Date(value);
            formattedDate.setHours(12, 0, 0, 0);
            const newValue = formattedDate.toISOString().split('T')[0];
            setFormData(prevState => ({
                ...prevState,
                [name]: newValue
            }));
            validateField(name, formattedDate);
        } else {
            const newValue = files ? files[0] : value;
            setFormData(prevState => ({
                ...prevState,
                [name]: newValue
            }));
            validateField(name, newValue);
        }
    }, [validateField]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        const isValid = await validateForm(formData);
        if (!isValid) return;

        setIsLoading(true);
        
        try {
            const submissionData = { ...formData };
            if (submissionData.lastSeenDate) {
                const date = new Date(submissionData.lastSeenDate);
                date.setHours(12, 0, 0, 0);
                submissionData.lastSeenDate = date.toISOString();
            }

            await petApi.addLostPet(submissionData);
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
            setErrors(prev => ({
                ...prev,
                submit: error.message || t('errors.submitFailed')
            }));
        } finally {
            setIsLoading(false);
        }
    }, [formData, navigate, setIsLoading, validateForm, t]);

    return {
        formData,
        errors,
        isLoading,
        today,
        handleChange,
        handleSubmit,
        t
    };
} 