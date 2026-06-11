import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import SectionTitle from '../components/SectionTitle';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
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
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = () => {
    if (validateForm()) {
      const newCard = {
        id: Date.now().toString(),
        cardNumber: formData.cardNumber,
        cardHolder: formData.cardHolder,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        balance: 0,
        limit: 5000,
        issuer: 'Visa',
        points: 0,
        milles: 0,
        cashback: 0,
        cutoffDate: 25,
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
});

export default AddCardScreen;
