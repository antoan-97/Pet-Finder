import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL;
//Register
export const register = async (email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/api/users/register`, {
            email,
            password,
        });
        return response.data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Login
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/api/users/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// export const getAllPets = async () => {
//     try {
//         const response = await axios.get('/api');
//         return response.data
//     } catch (error) {
//         console.error('Error fetching pets:', error);
//         throw error;
//     }
// }