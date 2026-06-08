import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import SectionTitle from '../../components/SectionTitle';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useAppDispatch } from '../../store/hooks';
import { addExpense } from '../../store/slices/expensesSlice';

interface ExpensesScreenProps {
  navigation: any;
}

const ExpensesScreen: React.FC<ExpensesScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    description: '',
  });

  const handleAddExpense = () => {
    if (!formData.title.trim() || !formData.amount.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      creator: 'Usuario',
      participants: ['Usuario'],
      splits: [{ userId: 'Usuario', amount: parseFloat(formData.amount), paid: false }],
      date: new Date().toISOString().split('T')[0],
    };

    dispatch(addExpense(newExpense));
    Alert.alert('Éxito', 'Gasto registrado correctamente');
    setFormData({ title: '', amount: '', description: '' });
  };

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle title="Registrar Gasto" />

        <CustomInput
          label="Descripción del Gasto"
          placeholder="Ej: Comida en restaurante"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
        />

        <CustomInput
          label="Monto"
          placeholder="0.00"
          value={formData.amount}
          onChangeText={(text) => setFormData({ ...formData, amount: text })}
          keyboardType="numeric"
        />

        <CustomInput
          label="Notas (Opcional)"
          placeholder="Agregar notas sobre el gasto"
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
        />

        <CustomButton
          label="Registrar Gasto"
          onPress={handleAddExpense}
          backgroundColor="#2E7D32"
        />

        <CustomButton
          label="Escanear Factura con IA"
          onPress={() => Alert.alert('Función', 'Escáner de facturas - En desarrollo')}
          backgroundColor="#1565C0"
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({});

export default ExpensesScreen;
