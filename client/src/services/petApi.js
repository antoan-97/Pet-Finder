import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL + '/api';

// Create axios instance for pets
const petApi = axios.create({
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

export const addFoundPet = async (formData) => {
    const token = getToken();

    const form = new FormData();
    form.append('kind', formData.kind);
    form.append('location', formData.location);
    form.append('breed', formData.breed);
    form.append('phone', formData.phone);
    form.append('description', formData.description);
    form.append('image', formData.image);

    try {
        const response = await petApi.post('/pets/addFoundPet', form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' // Important for file upload
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while submitting found pet:', error);
        throw error.response?.data || error;
    }
};

export const getAll = async () => {
    try {
        const response = await petApi.get('/pets', {
            params: {
                sortBy: '_createdOn desc'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
};

export const getOne = async (id) => {
    if (!id) {
        throw new Error('Pet ID is required');
    }
    console.log('Fetching pet with ID:', id);

    try {
        const response = await petApi.get(`/pets/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
};
