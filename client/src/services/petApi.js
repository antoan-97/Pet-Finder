// import { getToken } from './api';

import Cookies from 'js-cookie';
const baseURL = import.meta.env.VITE_BASE_URL + '/api';


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
        const response = await fetch(`${baseURL}/pets/addFoundPet`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: form,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit found pet information');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while submitting found pet:', error);
        throw error;
    }
};


export const getAll = async () => {
    const response = await fetch(`${baseURL}/pets?sortBy=_createdOn desc`, {  // Changed this line
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();
    return result;
};

export const getOne = async (id) => {
    if (!id) {
        throw new Error('Pet ID is required');
    }
    console.log('Fetching pet with ID:', id);  // Add this line for debugging
    const response = await fetch(`${baseURL}/pets/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();
    return result;
};
