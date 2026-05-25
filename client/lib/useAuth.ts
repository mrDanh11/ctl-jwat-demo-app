import { useState } from "react";
import { apiClient } from "./api";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.login(email, password);
      localStorage.setItem("token_exp", response.data.exp.toString());
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      localStorage.removeItem("token_exp");
      const response = await apiClient.logout();
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getMe();
      return response;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    apiClient.loginWithGoogle();
  };

  return {
    login,
    logout,
    getMe,
    loginWithGoogle,
    loading,
    error,
  };
}
