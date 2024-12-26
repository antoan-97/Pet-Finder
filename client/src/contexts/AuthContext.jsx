import { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie'
import * as api from '../services/api'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(() => {
        const accessToken = Cookies.get('accessToken');
        const email = Cookies.get('email');
        const userId = Cookies.get('userId');
        return accessToken && email ? { accessToken, email, userId } : {};
    });

    const registerSubmitHandler = async (values) => {
        try {
            const result = await api.register(values.email, values.password);

            const accessToken = result.token;
            const userId = result.userId;
            
            Cookies.set('accessToken', accessToken, {
                expires: 1,
                secure: true,
                sameSite: 'Strict',
            });
            Cookies.set('email', values.email, {
                expires: 1,
                secure: true,
                sameSite: 'Strict'
            });
            Cookies.set('userId', userId, {
                expires: 1,
                secure: true,
                sameSite: 'Strict'
            });
            
            setAuth({ accessToken, email: values.email, userId });
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    const loginSubmitHandler = async (values) => {
        try {
            const result = await api.login(values.email, values.password);

            const accessToken = result.token;
            const userId = result.userId;
            
            Cookies.set('accessToken', accessToken, {
                expires: 1,
                secure: true,
                sameSite: 'Strict',
            });
            Cookies.set('email', values.email, {
                expires: 1,
                secure: true,
                sameSite: 'Strict'
            });
            Cookies.set('userId', userId, {
                expires: 1,
                secure: true,
                sameSite: 'Strict'
            });

            setAuth({ accessToken, email: values.email, userId });
            navigate('/');
        } catch (error) {
            setAuth({});
            console.error('Login failed:', error.message);
        }
    };

    const logoutSubmitHandler = () => {
        Cookies.remove('accessToken');
        Cookies.remove('email');
        Cookies.remove('userId');
        setAuth({});
        navigate('/login');
    };

    const values = {
        registerSubmitHandler,
        loginSubmitHandler,
        logoutSubmitHandler,
        email: auth?.email || null,
        userId: auth?.userId || null,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;