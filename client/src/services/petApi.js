import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_BASE_URL;

const petApi = axios.create({
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

export const addFoundPet = async (formData) => {
    const token = getToken();

    const form = new FormData();
    form.append('kind', formData.kind);
    form.append('location', formData.location);
    form.append('breed', formData.breed);
    form.append('phone', formData.phone);
    form.append('description', formData.description);
    form.append('image', formData.image);
    form.append('ownerId', formData.ownerId);

    try {
        const response = await petApi.post('/pets/addFoundPet', form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while submitting found pet:', error);
        throw error.response?.data || error;
    }
};

export const addLostPet = async (formData) => {
    const token = getToken();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('kind', formData.kind);
    form.append('breed', formData.breed);
    form.append('lastSeenLocation', formData.lastSeenLocation);
    form.append('lastSeenDate', formData.lastSeenDate);
    form.append('phone', formData.phone);
    form.append('description', formData.description);
    form.append('image', formData.image);
    form.append('ownerId', formData.ownerId);

    try {
        const response = await petApi.post('/pets/addLostPet', form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while submitting lost pet:', error);
        throw error.response?.data || error;
    }
};

export const getAllFound = async () => {
    try {
        const response = await petApi.get('/pets/found', {
            params: {
                sortBy: '_createdOn desc'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
};

export const getOneFound = async (id) => {
    if (!id) {
        throw new Error('Pet ID is required');
    }

    try {
        const response = await petApi.get(`/pets/found/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
};

export const updateFoundPet = async (id, formData) => {
    const token = getToken();
    try {
        const response = await petApi.put(`/pets/found/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while updating found pet:', error);
        throw error.response?.data || error;
    }
};

export const deleteFoundPet = async (id) => {
    const token = getToken();
    try {
        const response = await petApi.delete(`/pets/found/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
};

//Lost Pets
export const getAllLost = async () => {
    try {
        const response = await petApi.get('/pets/lost', {
            params: {
                sortBy: '_createdOn desc'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
};


export const getOneLost = async (id) => {
    if (!id) {
        throw new Error('Pet ID is required');
    }
    try {
        const response = await petApi.get(`/pets/lost/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
}
export const updateLostPet = async (id, formData) => {
    const token = getToken();
    try {
        const response = await petApi.put(`/pets/lost/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while updating lost pet:', error);
        throw error.response?.data || error;
    }
};

export const deleteLostPet = async (id) => {
    const token = getToken();
    try {
        const response = await petApi.delete(`/pets/lost/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
};






