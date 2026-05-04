"use client"

import { useState } from "react"
import { loginUser, registerUser } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("access_token", data.access_token);
      setUser(email);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function register(username: string, email: string, password: string) {
    setLoading(true)
    setError(null)

    try {
      await registerUser({ username, email, password })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem("access_token")
    setUser(null)
  }

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
  }
}