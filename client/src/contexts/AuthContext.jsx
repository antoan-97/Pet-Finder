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
        return accessToken  && email ? { accessToken , email } : {};
    });

    const registerSubmitHandler = async (values) => {
        try {
            const result = await api.register(values.email, values.password);

            const accessToken = result.token; // Assuming the token is returned here
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
            setAuth({ accessToken, email: values.email });

            navigate('/');
            console.log('Registration successful:', result);
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    const loginSubmitHandler = async (values) => {
        try {
            const result = await api.login(values.email, values.password);

            const accessToken = result.token;
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

            setAuth({ accessToken, email: values.email });
            console.log('Login successful:', result);
            navigate('/');
        } catch (error) {
            setAuth({});
            console.error('Login failed:', error.message);
        }
    };

    const logoutSubmitHandler = () => {
        Cookies.remove('accessToken ');
        Cookies.remove('email');
        setAuth({});
        navigate('/login');
    };

    const values = {
        registerSubmitHandler,
        loginSubmitHandler,
        logoutSubmitHandler,
        email: auth?.email || null,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;