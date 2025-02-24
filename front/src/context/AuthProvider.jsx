import { createContext, useContext, useEffect, useState } from "react"
import instance from "../axiosConfig"

const AuthContext = createContext(null)
function AuthProvider({ children }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    useEffect(() => {
        checkAuth()
    }, [])

    async function checkAuth() {
        const response = await instance.get("/auth/check", { withCredentials: true, })
        if (response.status === 200) setIsUserLoggedIn(true)
    }
    async function Logout() {
        const response = await instance.post("/LogoutUser", { withCredentials: true })
        if(response.status === 200) setIsUserLoggedIn()

    }
    return (
        <AuthContext.Provider value={{ isUserLoggedIn, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider
