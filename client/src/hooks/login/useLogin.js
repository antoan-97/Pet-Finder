import { useState, useEffect, useContext } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import AuthContext from '../../contexts/AuthContext';

export const useLogin = () => {
    const { t } = useTranslation();
    const { loginSubmitHandler } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading();

    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required(t('validations.required'))
            .email(t('validations.email')),
        password: Yup.string()
            .required(t('validations.required'))
    });

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

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

    const onChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear server error when user starts typing
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.server;
            return newErrors;
        });
        
        setTimeout(() => validateField(name, value), 0);
    };

    const onRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
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

    const onSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateForm();
        if (!isValid) return;

        setIsLoading(true);
        
        try {
            await loginSubmitHandler(formData, rememberMe);
            
            if (rememberMe) {
                localStorage.setItem('savedEmail', formData.email);
            } else {
                localStorage.removeItem('savedEmail');
            }
        } catch (error) {
            console.error('Login error:', error);
            // Clear password on failed login
            setFormData(prev => ({
                ...prev,
                password: ''
            }));

            // Get the error message from the response
            const errorMessage = error.response?.data || 'Invalid email or password';
            
            // Set the server error message to both email and password fields
            setErrors({
                email: errorMessage,
                password: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        t,
        isLoading,
        rememberMe,
        formData,
        errors,
        onChange,
        onRememberMeChange,
        onSubmit
    };
}; 