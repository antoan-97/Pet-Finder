import axios from 'axios'

export const getAllPets = async () => {
    try {
        const response = await axios.get('/api');
        return response.data
    } catch (error) {
        console.error('Error fetching pets:', error);
        throw error;
    }
}