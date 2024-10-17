const baseURL = import.meta.env.VITE_BASE_URL + '/api';
import Cookies from 'js-cookie';

const getToken = () => {
    const token = Cookies.get('accessToken');
    console.log('Retrieved token:', token); // Log the token for debugging
    return token;
};


//Register
export const register = async (email, password) => {
    const token = getToken();
    console.log('Base URL:', baseURL); // Debugging line
    const response = await fetch(`${baseURL}/users/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
    }

    const data = await response.json();

    return data
}
// Login
export const login = async (email, password) => {
    const token = getToken(); // 
    console.log('Base URL:', baseURL); // Debugging line
    const response = await fetch(`${baseURL}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`, 
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

    const data = await response.json();

    return data; 
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


// export const getAllPets = async () => {
//     try {
//         const response = await axios.get('/api');
//         return response.data
//     } catch (error) {
//         console.error('Error fetching pets:', error);
//         throw error;
//     }
// }
