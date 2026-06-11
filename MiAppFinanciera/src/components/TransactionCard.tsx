import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface TransactionCardProps {
  storeName: string;
  amount: number;
  date: string;
  category: 'Comida' | 'Transporte' | 'Entretenimiento' | 'Otro';
  onPress?: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  storeName,
  amount,
  date,
  category,
  onPress,
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Comida':
        return '#FF6B6B';
      case 'Transporte':
        return '#4ECDC4';
      case 'Entretenimiento':
        return '#95E1D3';
      default:
        return '#A0A0A0';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.categoryDot,
            { backgroundColor: getCategoryColor(category) },
          ]}
        />
        <View style={styles.info}>
          <Text style={styles.storeName}>{storeName}</Text>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    marginVertical: 6,
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  category: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: '#999999',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
  },
});

export default TransactionCard;
