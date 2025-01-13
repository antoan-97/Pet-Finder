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
    return token;
};

export const getAllDogs = async () => {
    try {
        const response = await adoptionApi.get('/adoption/adoptionDog');
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

export const getOneDog = async (id) => {
    const token = getToken();
    try {
        const response = await adoptionApi.get(`/adoption/adoptionDog/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching dog details:', error);
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
        throw error;
    }
};

export const addAdoptionCat = async (formData) => {
    const token = getToken();
    try {
        const response = await adoptionApi.post('/adoption/addAdoptionCat', formData, {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data'
            }    
        });
        return response.data;    
    } catch (error) {
        console.error('Error while submitting cat for adoption:', error);
        throw error;
    }
};

export const deleteAdoptionDog = async (id) => {
    const token = getToken();
    try {
        const response = await adoptionApi.delete(`/adoption/adoptionDog/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting dog:', error);
        throw error;
    }
};

