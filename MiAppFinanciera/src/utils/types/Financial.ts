export interface MerchantDiscount {
  merchantName: string;
  discountRate: number; // Ejemplo: 0.10 para 10%
  maxDiscountPerMonth?: number; // Límite de ahorro total para este comercio
  currentMonthDiscount?: number; // Lo que se ha ahorrado este mes en este comercio
  applicableDays?: number[]; // Días específicos (ej: [15, 30]). Si está vacío, aplica siempre.
}

export interface CreditCard {
  id: string;
  bankName: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  limit: number;
  issuer: string;
  points: number;
  miles: number;
  cashback: number;
  pointsToLpsFactor?: number;
  cashbackRate?: number;
  maxMonthlyCashback?: number;
  currentMonthCashback?: number;
  merchantDiscounts?: MerchantDiscount[];
  cutoffDate: number;
  dueDate: number;
}

export interface Transaction {
  id: string;
  storeName: string;
  amount: number;
  date: string;
  category: 'Comida' | 'Transporte' | 'Entretenimiento' | 'Otro';
  cardId: string;
  receipt?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage?: string;
  createdAt: string;
}

export interface SharedExpense {
  id: string;
  title: string;
  amount: number;
  creator: string;
  participants: string[];
  splits: { userId: string; amount: number; paid: boolean }[];
  date: string;
}
