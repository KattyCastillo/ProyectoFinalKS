import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreditCard } from '../../utils/types/Financial';

interface CardsState {
  cards: CreditCard[];
}

const initialState: CardsState = {
  cards: [
    {
      id: '1',
      bankName: 'BAC Credomatic',
      cardNumber: '4532123456789010',
      cardHolder: 'Juan Pérez',
      expiryDate: '12/25',
      cvv: '123',
      balance: 1250.50,
      limit: 5000,
      issuer: 'Visa',
      points: 2500,
      miles: 500,
      cashback: 125.50,
      pointsToLpsFactor: 0.02, // Ejemplo: cada punto vale 0.02 LPS
      cashbackRate: 0.07,      // 7% de cashback
      maxMonthlyCashback: 625, // Límite mensual de cashback
      currentMonthCashback: 450, // Lo acumulado en el mes
      merchantDiscounts: [
        { 
          merchantName: 'Hugo', 
          discountRate: 0.15, 
          maxDiscountPerMonth: 500, 
          currentMonthDiscount: 0 
        }
      ],
      cutoffDate: 25,
      dueDate: 10,
    },
    {
      id: '2',
      bankName: 'Banco Lafise',
      cardNumber: '5425123456789012',
      cardHolder: 'Juan Pérez',
      expiryDate: '08/24',
      cvv: '456',
      balance: 750.00,
      limit: 3000,
      issuer: 'MasterCard',
      points: 1500,
      miles: 300,
      cashback: 75.00,
      pointsToLpsFactor: 0.015,
      cashbackRate: 0.05,
      maxMonthlyCashback: 500,
      currentMonthCashback: 120,
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
      action: PayloadAction<{ 
        cardId: string; 
        amount: number; 
        isSpecialCategory?: boolean;
        storeName?: string;
      }>
    ) => {
      const { cardId, amount, isSpecialCategory = true, storeName } = action.payload;
      const card = state.cards.find(c => c.id === cardId);
      
      if (card) {
        let finalAmount = amount;
        const today = new Date().getDate();

        // 1. Verificar Descuento por Comercio
        if (storeName && card.merchantDiscounts) {
          const rule = card.merchantDiscounts.find(
            d => d.merchantName.toLowerCase() === storeName.toLowerCase()
          );
          
          // Verificar si aplica hoy (si no hay días definidos, aplica siempre)
          const isDayApplicable = !rule?.applicableDays || 
                                 rule.applicableDays.length === 0 || 
                                 rule.applicableDays.includes(today);

          if (rule && isDayApplicable) {
            let discount = amount * rule.discountRate;
            
            // Aplicar límite mensual por comercio
            const maxPossible = rule.maxDiscountPerMonth !== undefined 
              ? Math.max(0, rule.maxDiscountPerMonth - (rule.currentMonthDiscount || 0))
              : discount;

            discount = Math.min(discount, maxPossible);
            rule.currentMonthDiscount = (rule.currentMonthDiscount || 0) + discount;
            finalAmount -= discount;
          }
        }

        // 2. Actualizar el saldo principal
        card.balance += finalAmount;

        // 3. Calcular Puntos
        card.points += Math.floor(finalAmount);

        // 3. Lógica de Cashback (Solo si es categoría especial como Supermercado/Comida)
        if (isSpecialCategory && card.cashbackRate && card.maxMonthlyCashback) {
          const potentialCashback = amount * card.cashbackRate;
          const remainingLimit = card.maxMonthlyCashback - (card.currentMonthCashback || 0);
          
          const earnedCashback = Math.max(0, Math.min(potentialCashback, remainingLimit));
          
          card.cashback += earnedCashback;
          card.currentMonthCashback = (card.currentMonthCashback || 0) + earnedCashback;
        }
      }
    },
  },
});

export const { addCard, updateCard, deleteCard, updateCardBalance } =
  cardsSlice.actions;
export default cardsSlice.reducer;
