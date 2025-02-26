import { createContext, useContext, useEffect, useState } from "react"
import instance from "../axiosConfig"

const AuthContext = createContext(null)
function AuthProvider({ children }) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    useEffect(() => {
        checkAuth()
    }, [])

    async function checkAuth() {
        
        try {
            await instance.get("/auth/check", {
              withCredentials: true,
            });
            setIsUserLoggedIn(true);
          } catch (error) {
            console.log(error);
            setIsUserLoggedIn(false); // Ensure logout state
          }
    }
    
    
    async function logout() {
        try {
          await instance.post(
            "/auth/logout",
            {},
            {
              withCredentials: true,
            }
          );
          setIsUserLoggedIn(false);
          checkAuth(); //Ensures the auth state is updated
        } catch (error) {
          console.log(error);
        }
      }
    return (
        <AuthContext.Provider value={{ isUserLoggedIn, logout , checkAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

export default AuthProvider
