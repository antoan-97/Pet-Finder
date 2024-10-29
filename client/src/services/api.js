const baseURL = import.meta.env.VITE_BASE_URL + '/api';
import Cookies from 'js-cookie';

export const getToken = () => {
    const token = Cookies.get('accessToken');
    console.log('Retrieved token:', token);
    return token;
};

// User-related API calls (register, login, logout) stay here
export const register = async (email, password) => {
    try {
        const response = await fetch(`${baseURL}/users/register`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const logout = async () => {
    const token = getToken();

    const headers = {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,

    };


    try {
        const response = await fetch(`${baseURL}/users/logout`, {
            method: 'POST',
            headers: headers,
        });

        if (response.status === 204) {
            return {}; // Logout successful
        }

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to logout: ${errorText}`);
        }

        const result = response
        return result;
    } catch (error) {
        throw new Error(`Failed to logout: ${error.message}`);
    }
}




