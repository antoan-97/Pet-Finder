const baseURL = import.meta.env.VITE_BASE_URL + '/api/users';
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
    const response = await fetch(`${baseURL}/register`, {
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
    const response = await fetch(`${baseURL}/login`, {
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
        const response = await fetch(`${baseURL}/logout`, {
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



// export const getAllPets = async () => {
//     try {
//         const response = await axios.get('/api');
//         return response.data
//     } catch (error) {
//         console.error('Error fetching pets:', error);
//         throw error;
//     }
// }