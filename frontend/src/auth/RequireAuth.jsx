import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
    const { user } = useAuth()

    return (
        user.user 
        ? <Outlet />
        : <Navigate to="/login" replace />
    )
}

export default RequireAuth