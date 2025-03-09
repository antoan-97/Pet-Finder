import { useState, useEffect, useContext } from 'react';
import { useLoading } from '../../contexts/LoadingContext';
import { useTranslation } from 'react-i18next';
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

    useEffect(() => {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    const onChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
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
        } finally {
            setIsLoading(false);
        }
    };

    return {
        t,
        isLoading,
        rememberMe,
        formData,
        onChange,
        onRememberMeChange,
        onSubmit
    };
}; 