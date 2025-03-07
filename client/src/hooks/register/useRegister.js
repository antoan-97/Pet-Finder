import { useState } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useTranslation } from 'react-i18next';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

// Validation schema matching server requirements exactly
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required!')
        .email('Please enter a valid email address!')
        .min(10, 'Email should be at least 10 characters long!')
        .matches(/.+\@.+\..+/, 'Please enter a valid email address!'),
    password: Yup.string()
        .required('Password is required!')
        .min(4, 'Password should be at least 4 characters long!'),
    confirmPassword: Yup.string()
        .required('Please confirm your password!')
        .oneOf([Yup.ref('password')], 'Password missmatch!')
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
            // Create a temporary object with all form data
            const dataToValidate = {
                ...formData,
                [name]: value
            };

            // Validate only the specific field
            await validationSchema.validateAt(name, dataToValidate);
            
            // For confirmPassword, we need to revalidate when password changes
            if (name === 'password' && dataToValidate.confirmPassword) {
                await validationSchema.validateAt('confirmPassword', dataToValidate);
            }
            
            // Clear errors for the validated field(s)
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                // If password is valid and matches confirm password, clear confirm password error
                if (name === 'password' && value === dataToValidate.confirmPassword) {
                    delete newErrors.confirmPassword;
                }
                // If confirm password is valid and matches password, clear both errors
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
        
        // Ensure at least one of each character type
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
        
        // Clear any existing password-related errors since we know they match
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.password;
            delete newErrors.confirmPassword;
            return newErrors;
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        
        // Update form data
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate the field with a slight delay to ensure state is updated
        setTimeout(() => validateField(name, value), 0);
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Validate all fields before submission
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            
            setIsLoading(true);
            await registerSubmitHandler(formData);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // Transform validation errors into an object
                const validationErrors = {};
                error.inner.forEach(err => {
                    validationErrors[err.path] = err.message;
                });
                setErrors(validationErrors);
                return; // Don't proceed with submission if validation fails
            }
            // Handle other errors (e.g., API errors)
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