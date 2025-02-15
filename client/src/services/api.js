import axios from 'axios';
import Cookies from 'js-cookie';

// Remove '/api' from here since we're using axios baseURL
const baseURL = import.meta.env.VITE_BASE_URL;

// Create axios instance for auth
const authApi = axios.create({
    baseURL: baseURL + '/api',  // Add '/api' here once
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

// User-related API calls (register, login, logout) stay here
export const register = async (email, password) => {
    try {
        // Now just use the endpoint without baseURL
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

// Convert login to axios
export const login = async (email, password) => {
    try {
        const response = await authApi.post('/users/login', {
            email,
            password
        });
        return response.data;  // axios automatically handles JSON parsing
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
            return {}; // Logout successful
        }
        return response.data;
    } catch (error) {
        console.error('Logout error:', error.response?.data || error);
        throw new Error(`Failed to logout: ${error.response?.data?.message || error.message}`);
    }
}




