import { createContext, useContext, useEffect, useState } from "react";
import instance from "../axiosConfig";

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
    checkAuthAdmin();
  }, []);

  async function checkAuthAdmin() {
    try {
      await instance.get("/admin/check", { withCredentials: true });
      setIsAdminLoggedIn(true);
    } catch (error) {
      console.log(error);
      setIsAdminLoggedIn(false); // Ensure logout state
    }
  }

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
      if(isUserLoggedIn){
      await instance.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsUserLoggedIn(false);
      checkAuth(); //Ensures the auth state is updated
    } else{
      await instance.post(
        "/admin/logout",
        {},
        {
          withCredentials: true,
        }
      );
      setIsAdminLoggedIn(false);
      checkAuthAdmin();
    }
  }catch (error) {
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, logout, checkAuth, checkAuthAdmin ,isAdminLoggedIn}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
