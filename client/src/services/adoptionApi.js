import axios from "axios";
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL + '/api';

const adoptionApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getToken = () => {
    const token = Cookies.get('accessToken');
    console.log('Retrieved token:', token);
    return token;
};

export const getAllDogs = async () => {
    try {
        console.log('Making API request to:', `${baseURL}/adoption/adoptionDog`);
        const response = await adoptionApi.get('/adoption/adoptionDog');
        console.log('Full API response:', response);
        
        if (!response.data) {
            console.warn('No data in response:', response);
            return [];
        }
        
        return response.data;
    } catch (error) {
        console.error('API Error:', {
            message: error.message,
            response: error.response,
            status: error.response?.status,
            data: error.response?.data
        });
        throw error;
    }
};

export const addAdoptionDog = async (formData) => {
    const token = getToken();
    try {
        const response = await adoptionApi.post('/adoption/addAdoptionDog', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while submitting dog for adoption:', error);
        throw error.response?.data || error;
    }
};

