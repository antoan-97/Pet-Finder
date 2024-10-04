const baseURL = import.meta.env.VITE_BASE_URL + '/api/users';
//Register
export const register = async (email, password) => {
    console.log('Base URL:', baseURL); // Debugging line
    const response = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            // 'Authorization': 'Bearer 71|sbOBnrse0bTr5pwN6OWDuXG0P7WtzCmVJ9P7bu7w76a67677',
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
    try {
        const response = await axios.post(`${baseUrl}/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Login failed');
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