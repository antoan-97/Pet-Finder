import { useState } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useTranslation } from 'react-i18next';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required(t('validations.required'))
        .email(t('validations.email'))
        .min(10, t('validations.min', { min: 10 }))
        .matches(/.+\@.+\..+/, t('validations.email')),
    password: Yup.string()
        .required(t('validations.required'))
        .min(4, t('validations.min', { min: 4 })),
    confirmPassword: Yup.string()
        .required(t('validations.required'))
        .oneOf([Yup.ref('password')], t('validations.confirmPassword')),
});

export const useRegister = (registerSubmitHandler) => {
    const { t } = useTranslation();
    const { isLoading, setIsLoading } = useLoading();
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(faEye);
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(faEye);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});

    const validateField = async (name, value) => {
        try {
            const dataToValidate = {
                ...formData,
                [name]: value
            };

            await validationSchema.validateAt(name, dataToValidate);
            
            if (name === 'password' && dataToValidate.confirmPassword) {
                await validationSchema.validateAt('confirmPassword', dataToValidate);
            }
            
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                if (name === 'password' && value === dataToValidate.confirmPassword) {
                    delete newErrors.confirmPassword;
                }
                if (name === 'confirmPassword' && value === dataToValidate.password) {
                    delete newErrors.confirmPassword;
                    delete newErrors.password;
                }
                return newErrors;
            });
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                [error.path]: error.message
            }));
        }
    };

    const togglePasswordVisibility = () => {
        if(passwordType === 'password') {
            setPasswordType('text');
            setPasswordIcon(faEyeSlash);
        } else {
            setPasswordType('password');
            setPasswordIcon(faEye);
        }
    };

    const toggleConfirmPasswordVisibility = () => {
        if(confirmPasswordType === 'password') {
            setConfirmPasswordType('text');
            setConfirmPasswordIcon(faEyeSlash);
        } else {
            setConfirmPasswordType('password');
            setConfirmPasswordIcon(faEye);
        }
    };

    const generatePassword = () => {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
        password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
        password += "0123456789"[Math.floor(Math.random() * 10)];
        password += "!@#$%^&*"[Math.floor(Math.random() * 8)];
        
        for (let i = password.length; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }

        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
        const newFormData = {
            ...formData,
            password: password,
            confirmPassword: password
        };
        
        setFormData(newFormData);
        
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.password;
            delete newErrors.confirmPassword;
            return newErrors;
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setTimeout(() => validateField(name, value), 0);
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            
            setIsLoading(true);
            await registerSubmitHandler(formData);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
                return;
            }
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        t,
        isLoading,
        termsAccepted,
        passwordType,
        confirmPasswordType,
        passwordIcon,
        confirmPasswordIcon,
        formData,
        errors,
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
        generatePassword,
        onChange,
        handleCheckboxChange,
        onSubmit
    };
}; 