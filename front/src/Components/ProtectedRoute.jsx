import React from "react";
import { useEffect, useState } from "react";
import instance from "../axiosConfig";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllowedStatus();
  }, []);

  async function fetchAllowedStatus() {
    try {
      setLoading(true);
      await instance.get("/admin/check", { withCredentials: true });
      setAllowed(true);
    } catch (error) {
      setAllowed(false);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  if (loading) return <div>LOADING...</div>;
  return allowed ? children : <Navigate to="/admin/AddProduct" replace />;
}

export default ProtectedRoute;
