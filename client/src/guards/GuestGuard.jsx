import { Navigate, Outlet } from "react-router-dom";
import AuthContext from '../contexts/AuthContext'
import { useContext } from "react";


export default function AuthGuard() {
    const { isAuthenticated } = useContext(AuthContext)

    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return <Outlet />
}