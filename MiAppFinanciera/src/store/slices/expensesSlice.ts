import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SharedExpense } from '../utils/types/Financial';

interface ExpensesState {
  expenses: SharedExpense[];
}

const initialState: ExpensesState = {
  expenses: [
    {
      id: '1',
      title: 'Cena en Restaurante',
      amount: 150.00,
      creator: 'Juan',
      participants: ['Juan', 'María'],
      splits: [
        { userId: 'Juan', amount: 75, paid: true },
        { userId: 'María', amount: 75, paid: false },
      ],
      date: '2024-06-01',
    },
  ],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<SharedExpense>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<SharedExpense>) => {
      const index = state.expenses.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(e => e.id !== action.payload);
    },
    markExpenseAsPaid: (
      state,
      action: PayloadAction<{ expenseId: string; userId: string }>
    ) => {
      const expense = state.expenses.find(e => e.id === action.payload.expenseId);
      if (expense) {
        const split = expense.splits.find(s => s.userId === action.payload.userId);
        if (split) {
          split.paid = true;
        }
      }
    },
  },
});

export const { addExpense, updateExpense, deleteExpense, markExpenseAsPaid } =
  expensesSlice.actions;
export default expensesSlice.reducer;
