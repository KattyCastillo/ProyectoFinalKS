import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface CreditCardProps {
  bankName: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  balance: number;
  limit: number;
  backgroundColor?: string;
  onPress?: () => void;
}

const CreditCard: React.FC<CreditCardProps> = ({
  bankName,
  cardNumber,
  cardHolder,
  expiryDate,
  balance,
  limit,
  backgroundColor = '#1565C0',
  onPress,
}) => {
  const lastFourDigits = cardNumber.slice(-4);
  const utilizationPercentage = (balance / limit) * 100;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.bankName}>{bankName}</Text>
        <Text style={styles.cardType}>VISA</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.cardNumber}>•••• •••• •••• {lastFourDigits}</Text>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.label}>Titular</Text>
          <Text style={styles.cardHolder}>{cardHolder}</Text>
        </View>
        <View>
          <Text style={styles.label}>Vencimiento</Text>
          <Text style={styles.expiryDate}>{expiryDate}</Text>
        </View>
      </View>

      <View style={styles.balanceBar}>
        <View
          style={[
            styles.balanceFill,
            {
              width: `${Math.min(utilizationPercentage, 100)}%`,
              backgroundColor:
                utilizationPercentage > 80 ? '#FF6B6B' : '#4CAF50',
            },
          ]}
        />
      </View>

      <View style={styles.balanceInfo}>
        <Text style={styles.balanceText}>
          L {balance.toFixed(2)} de L {limit.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  bankName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cardType: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  middle: {
    marginBottom: 20,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  cardHolder: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  expiryDate: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  balanceBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
  },
  balanceFill: {
    height: '100%',
    borderRadius: 3,
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  balanceText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default CreditCard;
