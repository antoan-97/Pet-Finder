import axios from "axios";
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL;

const adoptionApi = axios.create({
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

export const getAllDogs = async () => {
    try {
        const response = await adoptionApi.get('/adoption/adoptionDog');
        return response.data;
    } catch (error) {
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

export const getAllCats = async () => {
    try {
        const response = await adoptionApi.get('/adoption/adoptionCat');
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

export const getOneCat = async (id) => {
    const token = getToken();
    try {
        const response = await adoptionApi.get(`/adoption/adoptionCat/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cat details:', error);
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

export const updateAdoptionDog = async (id, formData) => {
    const token = getToken();
    try {
        const response = await adoptionApi.put(`/adoption/adoptionDog/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating dog:', error);
        throw error;
    }
};

export const updateAdoptionCat = async (id, formData) => {
    const token = getToken();
    try {
        const response = await adoptionApi.put(`/adoption/adoptionCat/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cat:', error);
        throw error;
    }
};

export const deleteAdoptionCat = async (id) => {
    const token = getToken();
    try {
        const response = await adoptionApi.delete(`/adoption/adoptionCat/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data
    } catch (error) {
        console.error('Error deleting cat:', error);
        throw error;
    }
}

