import { useState } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useTranslation } from 'react-i18next';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]; // Uppercase
        password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]; // Lowercase
        password += "0123456789"[Math.floor(Math.random() * 10)]; // Number
        password += "!@#$%^&*"[Math.floor(Math.random() * 8)]; // Special char
        
        // Fill the rest randomly
        for (let i = password.length; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }

        // Shuffle the password
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
        setFormData(prev => ({
            ...prev,
            password: password,
            confirmPassword: password
        }));
    };

    const onChange = (e) => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await registerSubmitHandler(formData);
        } catch (error) {
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
        togglePasswordVisibility,
        toggleConfirmPasswordVisibility,
        generatePassword,
        onChange,
        handleCheckboxChange,
        onSubmit
    };
}; 