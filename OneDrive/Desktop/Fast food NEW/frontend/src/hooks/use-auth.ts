"use client"

import { useState, useEffect } from "react"
import { loginUser, registerUser } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    function checkAuth(){
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
    }

    checkAuth();

    window.addEventListener("auth-change", checkAuth);
    
    return () => {
      window.removeEventListener("auth-change", checkAuth);
    };
  }, [])

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("access_token", data.access_token);
      window.dispatchEvent(new Event("auth-change"));
      setUser(email);
      setIsAuthenticated(true);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(username: string, email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      await registerUser({ username, email, password });
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("access_token")
    window.dispatchEvent(new Event("auth-change"));
    setUser(null)
    setIsAuthenticated(false)
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  }
}