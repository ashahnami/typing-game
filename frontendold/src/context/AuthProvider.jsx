import { createContext, useEffect, useState } from "react"
import axios from "axios"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/users/')
                setUser({ user: response.data.username })
            } catch (error) {
                console.log('Not logged in')
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    if (loading) {
        return <div></div>
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext