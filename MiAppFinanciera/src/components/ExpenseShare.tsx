import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface ExpenseShareProps {
  personName: string;
  amount: number;
  status: 'pending' | 'paid' | 'shared';
  onPress?: () => void;
}

const ExpenseShare: React.FC<ExpenseShareProps> = ({
  personName,
  amount,
  status,
  onPress,
}) => {
  const getStatusColor = (stat: string) => {
    switch (stat) {
      case 'pending':
        return '#FF9800';
      case 'paid':
        return '#4CAF50';
      case 'shared':
        return '#2196F3';
      default:
        return '#999999';
    }
  };

  const getStatusText = (stat: string) => {
    switch (stat) {
      case 'pending':
        return 'Pendiente';
      case 'paid':
        return 'Pagado';
      case 'shared':
        return 'Compartido';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {personName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.personName}>{personName}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(status) },
            ]}
          >
            <Text style={styles.statusText}>{getStatusText(status)}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.amount}>L {amount.toFixed(2)}</Text>
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
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  personName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  statusText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
  },
});

export default ExpenseShare;
