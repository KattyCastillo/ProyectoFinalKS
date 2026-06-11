/**
 * Este archivo contiene constantes y enumeraciones utilizadas
 * en toda la aplicación
 */

export enum CardIssuer {
  VISA = 'Visa',
  MASTERCARD = 'MasterCard',
  AMEX = 'American Express',
  DISCOVER = 'Discover',
}

export enum ExpenseCategory {
  FOOD = 'Comida',
  TRANSPORT = 'Transporte',
  ENTERTAINMENT = 'Entretenimiento',
  UTILITIES = 'Servicios',
  SHOPPING = 'Compras',
  HEALTH = 'Salud',
  OTHER = 'Otro',
}

export const COLORS = {
  PRIMARY: '#2E7D32',
  SECONDARY: '#1565C0',
  ERROR: '#D32F2F',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  INFO: '#2196F3',
  LIGHT_GRAY: '#F5F5F5',
  DARK_GRAY: '#333333',
  BORDER_GRAY: '#E0E0E0',
};

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  XXL: 24,
};

export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  FULL: 999,
};

export const FONT_SIZE = {
  XS: 10,
  SM: 12,
  MD: 14,
  LG: 16,
  XL: 18,
  XXL: 20,
  XXXL: 24,
  TITLE: 32,
};

export const FONT_WEIGHT = {
  NORMAL: '400' as const,
  MEDIUM: '500' as const,
  SEMIBOLD: '600' as const,
  BOLD: '700' as const,
};
