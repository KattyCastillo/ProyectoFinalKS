import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import SectionTitle from '../components/SectionTitle';
import CustomButton from '../components/CustomButton';
import CreditCard from '../components/CreditCard';
import { useAppSelector } from '../store/hooks';
import { useLanguage } from '../contexts/LanguageContext';

interface CardsScreenProps {
  navigation: any;
}

const CardsScreen: React.FC<CardsScreenProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const cards = useAppSelector((state) => state.cards.cards);

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle title={t('cards')} />

        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => navigation.navigate('CardDetails', { cardId: card.id })}
          >
            <CreditCard
              cardNumber={card.cardNumber}
              cardHolder={card.cardHolder}
              expiryDate={card.expiryDate}
              balance={card.balance}
              limit={card.limit}
              backgroundColor={card.issuer === 'Visa' ? '#1565C0' : '#FF6B35'}
            />
            <View style={styles.cardInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Puntos: </Text>
                <Text style={styles.infoValue}>{card.points}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Millas: </Text>
                <Text style={styles.infoValue}>{card.milles}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Cashback: </Text>
                <Text style={styles.infoValue}>${card.cashback.toFixed(2)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Corte: </Text>
                <Text style={styles.infoValue}>{card.cutoffDate} de cada mes</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <CustomButton
          label={t('addNewCard')}
          onPress={() => navigation.navigate('AddCard')}
          backgroundColor="#2E7D32"
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  cardInfo: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
});

export default CardsScreen;
