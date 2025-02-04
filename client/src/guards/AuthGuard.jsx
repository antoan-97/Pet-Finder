import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from '../contexts/AuthContext'
import ErrorPage from '../components/errorPage/ErrorPage'

export default function AuthGuard() {
    const { isAuthenticated } = useContext(AuthContext)

    if (!isAuthenticated) {
        return <Navigate to='/error-page' />
    }

    return <Outlet />
}