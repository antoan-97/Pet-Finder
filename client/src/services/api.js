import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL;

const authApi = axios.create({
    baseURL: baseURL + '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getToken = () => {
    const token = Cookies.get('accessToken');
    return token;
};

export const register = async (email, password) => {
    try {
        const response = await authApi.post('/users/register', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const login = async (email, password) => {
    try {
        const response = await authApi.post('/users/login', {
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error);
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const logout = async () => {
    const token = getToken();

    try {
        const response = await authApi.post('/users/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,

            }
        });

        if (response.status === 204) {
            return {};
        }
        return response.data;
    } catch (error) {
        console.error('Logout error:', error.response?.data || error);
        throw new Error(`Failed to logout: ${error.response?.data?.message || error.message}`);
    }
}




