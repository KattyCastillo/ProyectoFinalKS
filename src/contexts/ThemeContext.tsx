import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LIGHT_THEME, DARK_THEME, ThemeColors } from '../utils/types/ThemeColors';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  isDark: boolean;
  theme: ThemeColors;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? DARK_THEME : LIGHT_THEME;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setThemeMode = (mode: ThemeMode) => {
    setIsDark(mode === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
