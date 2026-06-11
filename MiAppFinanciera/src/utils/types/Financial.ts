export interface CreditCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  limit: number;
  issuer: string;
  points: number;
  milles: number;
  cashback: number;
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
