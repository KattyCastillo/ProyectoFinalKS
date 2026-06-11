import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slices/cardsSlice';
import expensesReducer from './slices/expensesSlice';

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    expenses: expensesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
