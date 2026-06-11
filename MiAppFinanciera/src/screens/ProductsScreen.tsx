import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import SectionTitle from '../components/SectionTitle';
import CustomButton from '../components/CustomButton';
import ExpenseShare from '../components/ExpenseShare';
import { useAppSelector } from '../store/hooks';
import { useLanguage } from '../contexts/LanguageContext';

interface SharedFinancesScreenProps {
  navigation: any;
}

const SharedFinancesScreen: React.FC<SharedFinancesScreenProps> = ({
  navigation,
}) => {
  const { t } = useLanguage();
  const expenses = useAppSelector((state) => state.expenses.expenses);

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle title={t('sharedFinances')} />

        {expenses.map((expense) => (
          <View key={expense.id} style={styles.expenseGroup}>
            <SectionTitle title={expense.title} />
            {expense.splits.map((split) => (
              <ExpenseShare
                key={split.userId}
                personName={split.userId}
                amount={split.amount}
                status={split.paid ? 'paid' : 'pending'}
              />
            ))}
          </View>
        ))}

        <CustomButton
          label={t('splitExpense')}
          onPress={() => navigation.navigate('SplitExpense')}
          backgroundColor="#2E7D32"
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  expenseGroup: {
    marginVertical: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});

export default SharedFinancesScreen;
