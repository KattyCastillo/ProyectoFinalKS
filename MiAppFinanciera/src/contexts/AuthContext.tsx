import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { setToken } from '../store/slices/authSlice';
import { supabase } from '../services/supabase';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const isLoggedIn = !!user;

  const handleSession = useCallback((session: any) => {
    console.log("AuthContext: handleSession ->", session ? `Usuario: ${session.user.email}` : "Sin sesión");
    
    if (session?.user) {
      setUser({
        id: session.user.id,
        email: session.user.email || '',
        firstName: session.user.user_metadata?.firstName || session.user.email?.split('@')[0] || '',
      });
      if (session.access_token) {
        dispatch(setToken(session.access_token));
      }
    } else {
      setUser(null);
      dispatch(setToken(null));
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    // Obtener sesión inicial y escuchar cambios
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      handleSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleSession]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("AuthContext: Login error:", error.message);
      setIsLoading(false);
      if (error.message.includes("Email not confirmed")) {
        Alert.alert('Verifica tu correo', 'Tu email no ha sido confirmado. Por favor, revisa tu bandeja de entrada para el enlace de confirmación.');
      } else {
        Alert.alert('Error al iniciar sesión', error.message);
      }
      return;
    }

    if (data.session) {
      handleSession(data.session);
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => {
    setIsLoading(true);
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
      console.error("AuthContext: Register error:", error.message);
      setIsLoading(false);
      Alert.alert('Error al registrarse', error.message);
      return;
    }

    if (data.session) {
      handleSession(data.session);
    } else {
      setIsLoading(false);
      Alert.alert('Registro exitoso', 'Por favor verifica tu correo electrónico para iniciar sesión.');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, login, register, logout }}>
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
