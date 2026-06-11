import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import SectionTitle from '../components/SectionTitle';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { MerchantDiscount } from '../utils/types/Financial';
import {
  validateCardNumber,
  validateCVV,
  validateExpiryDate,
} from '../utils/validators';
import { useAppDispatch } from '../store/hooks';
import { addCard } from '../store/slices/cardsSlice';
import { useLanguage } from '../contexts/LanguageContext';

interface AddCardScreenProps {
  navigation: any;
}

const AddCardScreen: React.FC<AddCardScreenProps> = ({ navigation }) => {
  const { t } = useLanguage();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    bankName: '',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    limit: '',
    pointsToLpsFactor: '0.02',
    cashbackRate: '0.07',
    maxMonthlyCashback: '625',
  });

  const [merchantDiscounts, setMerchantDiscounts] = useState<MerchantDiscount[]>([]);
  const [newMerchant, setNewMerchant] = useState({ name: '', rate: '', maxLimit: '', days: '' });

  const addMerchantDiscount = () => {
    if (newMerchant.name && newMerchant.rate) {
      // Convertir string de días "15, 30" a array [15, 30]
      const daysArray = newMerchant.days 
        ? newMerchant.days.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d))
        : undefined;

      setMerchantDiscounts([...merchantDiscounts, { 
        merchantName: newMerchant.name, 
        discountRate: parseFloat(newMerchant.rate),
        maxDiscountPerMonth: newMerchant.maxLimit ? parseFloat(newMerchant.maxLimit) : undefined,
        currentMonthDiscount: 0,
        applicableDays: daysArray
      }]);
      
      setNewMerchant({ name: '', rate: '', maxLimit: '', days: '' });
    }
  };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.bankName.trim()) {
      newErrors.bankName = t('requiredField');
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = t('requiredField');
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Número de tarjeta inválido (13-19 dígitos)';
    }

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = t('requiredField');
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = t('requiredField');
    } else if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Formato: MM/YY';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = t('requiredField');
    } else if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'CVV debe tener 3 o 4 dígitos';
    }

    if (!formData.limit.trim()) {
      newErrors.limit = t('requiredField');
    } else if (isNaN(parseFloat(formData.limit))) {
      newErrors.limit = 'Debe ser un número válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = () => {
    if (validateForm()) {
      const newCard = {
        id: Date.now().toString(),
        bankName: formData.bankName,
        cardNumber: formData.cardNumber,
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        balance: 0,
        limit: parseFloat(formData.limit),
        issuer: 'Visa',
        points: 0,
        miles: 0,
        cashback: 0,
        pointsToLpsFactor: parseFloat(formData.pointsToLpsFactor),
        cashbackRate: parseFloat(formData.cashbackRate),
        maxMonthlyCashback: parseFloat(formData.maxMonthlyCashback),
        currentMonthCashback: 0,
        merchantDiscounts: merchantDiscounts,
        cutoffDate: 20,
        dueDate: 10,
      };

      dispatch(addCard(newCard));
      Alert.alert('Éxito', 'Tarjeta agregada correctamente');
      navigation.goBack();
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle title="Agregar Nueva Tarjeta" />

        <CustomInput
          label="Nombre del Banco"
          placeholder="Ej: Banco Lafise"
          value={formData.bankName}
          onChangeText={(text) => setFormData({ ...formData, bankName: text })}
          keyboardType="default"
          error={errors.bankName}
        />

        <CustomInput
          label={t('cardNumber')}
          placeholder="4532 1234 5678 9010"
          value={formData.cardNumber}
          onChangeText={(text) =>
            setFormData({ ...formData, cardNumber: text })
          }
          keyboardType="numeric"
          error={errors.cardNumber}
        />

        <CustomInput
          label="Titular de la Tarjeta"
          placeholder="Juan Pérez"
          value={formData.cardHolder}
          onChangeText={(text) =>
            setFormData({ ...formData, cardHolder: text })
          }
          keyboardType="default"
          error={errors.cardHolder}
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <CustomInput
              label={t('expiryDate')}
              placeholder="12/25"
              value={formData.expiryDate}
              onChangeText={(text) =>
                setFormData({ ...formData, expiryDate: text })
              }
              keyboardType="numeric"
              error={errors.expiryDate}
            />
          </View>
          <View style={styles.column}>
            <CustomInput
              label={t('cvv')}
              placeholder="123"
              value={formData.cvv}
              onChangeText={(text) => setFormData({ ...formData, cvv: text })}
              keyboardType="numeric"
              secureTextEntry
              error={errors.cvv}
            />
          </View>
        </View>

        <CustomInput
          label="Límite de Crédito (LPS)"
          placeholder="5000"
          value={formData.limit}
          onChangeText={(text) => setFormData({ ...formData, limit: text })}
          keyboardType="decimal-pad"
          error={errors.limit}
        />

        <Text style={styles.sectionTitle}>Configuración de Beneficios</Text>

        <CustomInput
          label="Factor Puntos a Lps"
          placeholder="0.02"
          value={formData.pointsToLpsFactor}
          onChangeText={(text) => setFormData({ ...formData, pointsToLpsFactor: text })}
          keyboardType="decimal-pad"
        />

        <CustomInput
          label="Tasa de Cashback (ej: 0.07)"
          placeholder="0.07"
          value={formData.cashbackRate}
          onChangeText={(text) => setFormData({ ...formData, cashbackRate: text })}
          keyboardType="decimal-pad"
        />

        <CustomInput
          label="Límite Mensual Cashback (LPS)"
          placeholder="625"
          value={formData.maxMonthlyCashback}
          onChangeText={(text) => setFormData({ ...formData, maxMonthlyCashback: text })}
          keyboardType="decimal-pad"
        />

        <Text style={styles.sectionTitle}>Descuentos por Comercio</Text>
        <View style={styles.merchantForm}>
          <View style={{ flex: 1.5 }}>
            <CustomInput
              label="Comercio"
              placeholder="Ej: Hugo"
              value={newMerchant.name}
              onChangeText={(text) => setNewMerchant({ ...newMerchant, name: text })}
              keyboardType="default"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <CustomInput
              label="Desc. (0.1)"
              placeholder="0.15"
              value={newMerchant.rate}
              onChangeText={(text) => setNewMerchant({ ...newMerchant, rate: text })}
              keyboardType="decimal-pad"
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <CustomInput
              label="Tope Lps"
              placeholder="700"
              value={newMerchant.maxLimit}
              onChangeText={(text) => setNewMerchant({ ...newMerchant, maxLimit: text })}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <CustomInput
            label="Días del mes (ej: 15, 30)"
            placeholder="Vacío para todo el mes"
            value={newMerchant.days}
            onChangeText={(text) => setNewMerchant({ ...newMerchant, days: text })}
            keyboardType="default"
          />
        </View>
        <CustomButton 
          label="Añadir Regla de Descuento" 
          onPress={addMerchantDiscount} 
          backgroundColor="#546E7A"
        />

        {merchantDiscounts.map((item, index) => (
          <View key={index} style={styles.discountBadge}>
            <View style={{ flex: 1 }}>
              <Text style={styles.discountText}>
                {item.merchantName}: {item.discountRate * 100}% 
                {item.maxDiscountPerMonth ? ` (Máx: L ${item.maxDiscountPerMonth})` : ''}
              </Text>
              {item.applicableDays && item.applicableDays.length > 0 && (
                <Text style={styles.daysText}>Solo días: {item.applicableDays.join(', ')}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => setMerchantDiscounts(merchantDiscounts.filter((_, i) => i !== index))}>
              <Text style={{ color: '#D32F2F', fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}

        <CustomButton
          label="Agregar Tarjeta"
          onPress={handleAddCard}
          backgroundColor="#2E7D32"
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#666',
  },
  merchantForm: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  discountBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ECEFF1',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  discountText: { fontSize: 14, color: '#37474F' },
  daysText: { fontSize: 12, color: '#607D8B', marginTop: 2 },
});

export default AddCardScreen;
