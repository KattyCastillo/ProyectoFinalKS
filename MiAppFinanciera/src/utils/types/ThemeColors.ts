export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  error: string;
  success: string;
  warning: string;
};

export const LIGHT_THEME: ThemeColors = {
  primary: '#2E7D32',
  secondary: '#1565C0',
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: '#1A1A1A',
  textSecondary: '#666666',
  error: '#D32F2F',
  success: '#4CAF50',
  warning: '#FF9800',
};

export const DARK_THEME: ThemeColors = {
  primary: '#4CAF50',
  secondary: '#64B5F6',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  error: '#F44336',
  success: '#66BB6A',
  warning: '#FFB74D',
};
