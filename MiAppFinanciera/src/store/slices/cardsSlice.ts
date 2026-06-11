import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreditCard } from '../utils/types/Financial';

interface CardsState {
  cards: CreditCard[];
}

const initialState: CardsState = {
  cards: [
    {
      id: '1',
      cardNumber: '4532123456789010',
      cardHolder: 'Juan Pérez',
      expiryDate: '12/25',
      cvv: '123',
      balance: 1250.50,
      limit: 5000,
      issuer: 'Visa',
      points: 2500,
      milles: 500,
      cashback: 125.50,
      cutoffDate: 25,
      dueDate: 10,
    },
    {
      id: '2',
      cardNumber: '5425123456789012',
      cardHolder: 'Juan Pérez',
      expiryDate: '08/24',
      cvv: '456',
      balance: 750.00,
      limit: 3000,
      issuer: 'MasterCard',
      points: 1500,
      milles: 300,
      cashback: 75.00,
      cutoffDate: 15,
      dueDate: 5,
    },
  ],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CreditCard>) => {
      state.cards.push(action.payload);
    },
    updateCard: (state, action: PayloadAction<CreditCard>) => {
      const index = state.cards.findIndex(card => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    updateCardBalance: (
      state,
      action: PayloadAction<{ cardId: string; amount: number }>
    ) => {
      const card = state.cards.find(c => c.id === action.payload.cardId);
      if (card) {
        card.balance += action.payload.amount;
      }
    },
  },
});

export const { addCard, updateCard, deleteCard, updateCardBalance } =
  cardsSlice.actions;
export default cardsSlice.reducer;
