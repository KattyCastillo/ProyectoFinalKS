import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import SectionTitle from '../components/SectionTitle';
import CustomButton from '../components/CustomButton';
import CreditCard from '../components/CreditCard';
import TransactionCard from '../components/TransactionCard';
import { useAuth } from '../contexts/AuthContext';
import { useAppSelector } from '../store/hooks';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const cards = useAppSelector((state) => state.cards.cards);

  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);

  const mockTransactions = [
    {
      id: '1',
      storeName: 'Supermercado A',
      amount: 125.50,
      date: '2024-06-05',
      category: 'Comida' as const,
    },
    {
      id: '2',
      storeName: 'Uber',
      amount: 45.00,
      date: '2024-06-05',
      category: 'Transporte' as const,
    },
    {
      id: '3',
      storeName: 'Netflix',
      amount: 15.99,
      date: '2024-06-04',
      category: 'Entretenimiento' as const,
    },
  ];

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle title={`${t('dashboard')}, ${user?.firstName}!`} />

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>{t('totalBalance')}</Text>
          <Text style={styles.balanceAmount}>L {totalBalance.toFixed(2)}</Text>
        </View>

        <SectionTitle title={t('myCards')} />
        {cards.map((card) => (
          <CreditCard
            key={card.id}
            bankName={card.bankName}
            cardNumber={card.cardNumber}
            cardHolder={card.cardHolder}
            expiryDate={card.expiryDate}
            balance={card.balance}
            limit={card.limit}
            backgroundColor={card.issuer === 'Visa' ? '#1565C0' : '#FF6B35'}
            onPress={() => navigation.navigate('CardDetails', { cardId: card.id })}
          />
        ))}

        <CustomButton
          label={t('addCard')}
          onPress={() => navigation.navigate('AddCard')}
          backgroundColor="#2E7D32"
        />

        <SectionTitle title={t('recentTransactions')} />
        {mockTransactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            storeName={transaction.storeName}
            amount={transaction.amount}
            date={transaction.date}
            category={transaction.category}
          />
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
    marginVertical: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2E7D32',
  },
});

export default HomeScreen;
