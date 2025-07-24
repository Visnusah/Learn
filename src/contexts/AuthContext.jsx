import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password, role) => {
    // Mock login - in real app, this would make API call
    const mockUser = {
      id: '1',
      name: role === 'admin' ? 'Admin User' : role === 'teacher' ? 'John Instructor' : 'Sarah Student',
      email,
      role: role,
      avatar: `https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150`,
      joinDate: '2024-01-15'
    };
    setUser(mockUser);
  };

  const register = async (userData) => {
    // Mock registration - in real app, this would make API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Registration successful:', userData);
        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: user !== null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};