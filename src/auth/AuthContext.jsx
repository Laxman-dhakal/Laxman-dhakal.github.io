import { createContext, useEffect, useMemo, useState } from 'react';
import authService from './authService.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(authService.currentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authService.currentUser());
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = authService.login(credentials.email, credentials.password, credentials.remember);
    if (response.success) {
      setUser(response.user);
    }
    return response;
  };

  const register = async (registrationInfo) => {
    const response = authService.register(registrationInfo);
    if (response.success) {
      setUser(response.user);
    }
    return response;
  };

  const updateProfile = async (profileInfo) => {
    const response = authService.updateProfile(profileInfo);
    if (response.success) {
      setUser(response.user);
    }
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const forgotPassword = async (email) => authService.forgotPassword(email);

  const resetPassword = async (email, password) => authService.resetPassword(email, password);

  const value = useMemo(
    () => ({ user, loading, login, logout, register, updateProfile, forgotPassword, resetPassword }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
