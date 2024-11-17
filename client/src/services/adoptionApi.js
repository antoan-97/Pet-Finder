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
        const response = adoptionApi.get('adoption/dogs', {
            params: {
                sortBy: '_createdOn desc'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Network response was not ok ' + error.response?.statusText);
    }
};

