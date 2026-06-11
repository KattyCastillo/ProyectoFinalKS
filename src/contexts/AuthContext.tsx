import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { id: string; email: string; firstName: string } | null;
  login: (email: string, password: string) => void;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    firstName: string;
  } | null>(null);

  const login = (email: string, password: string) => {
    // Simulación de login
    setIsLoggedIn(true);
    setUser({
      id: '1',
      email,
      firstName: email.split('@')[0],
    });
  };

  const register = (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => {
    // Simulación de registro
    setIsLoggedIn(true);
    setUser({
      id: '1',
      email,
      firstName,
    });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
