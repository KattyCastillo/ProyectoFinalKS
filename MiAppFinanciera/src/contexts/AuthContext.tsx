import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { setToken } from '../store/slices/authSlice';
import { supabase } from '../services/supabase';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { id: string; email: string; firstName: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    firstName: string;
  } | null>(null);
  const dispatch = useAppDispatch();

  const isLoggedIn = !!user;

  useEffect(() => {
    // Escuchar cambios en la sesión de Supabase al montar el componente
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          firstName: session.user.user_metadata?.firstName || session.user.email?.split('@')[0] || '',
        });
        dispatch(setToken(session.access_token));
      } else {
        setUser(null);
        dispatch(setToken(null));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error al iniciar sesión', error.message);
      return;
    }

    if (data.session) {
      dispatch(setToken(data.session.access_token));
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          phone,
        },
      },
    });

    if (error) {
      Alert.alert('Error al registrarse', error.message);
      return;
    }

    if (data.session) {
      dispatch(setToken(data.session.access_token));
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
