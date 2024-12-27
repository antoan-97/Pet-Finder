import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as api from '../../services/api';
import AuthContext from '../../contexts/AuthContext';

export default function Logout() {
    const navigate = useNavigate();
    const { logoutSubmitHandler } = useContext(AuthContext)

    useEffect(() => {
        api.logout()
            .then(() => {
                logoutSubmitHandler()
                navigate('/login'); // Redirect to login after successful logout
            })
            .catch((error) => {
                navigate('/');
                console.error("Logout failed:", error.message);
            });
    }, [logoutSubmitHandler,navigate]);
    return null
}