import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SectionTitle from '../components/SectionTitle';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = t('requiredField');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    if (!formData.password.trim()) {
      newErrors.password = t('requiredField');
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async()  => {
    try {
      if (validateForm()) {
      await login(formData.email, formData.password);
      Alert.alert('Éxito', 'Sesión iniciada correctamente');
      //navigation.navigate('Home');
    }
    } catch (error) {
       console.error(error);
    }
  };

  return (
    <ScreenWrapper>
      <SectionTitle title={t('login')} subtitle="Gestor Financiero Inteligente" />

      <CustomInput
        label={t('email')}
        placeholder="correo@example.com"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        error={errors.email}
      />

      <CustomInput
        label={t('password')}
        placeholder="••••••••"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        error={errors.password}
      />

      <CustomButton
        label={t('login')}
        onPress={handleLogin}
        backgroundColor="#2E7D32"
      />

      <CustomButton
        label={t('dontHaveAccount')}
        onPress={() => navigation.navigate('Register')}
        backgroundColor="#1565C0"
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
