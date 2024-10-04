import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from '../contexts/AuthContext'

export default function AuthGuard() {
    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {
        return <Navigate to='/' />
    }

    return <Outlet />
}