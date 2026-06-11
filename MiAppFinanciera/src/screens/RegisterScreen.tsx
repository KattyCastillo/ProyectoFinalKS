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
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from '../utils/validators';
import { useLanguage } from '../contexts/LanguageContext';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { register } = useAuth();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('requiredField');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('requiredField');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('requiredField');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('invalidEmail');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('requiredField');
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t('invalidPhone');
    }
    if (!formData.password.trim()) {
      newErrors.password = t('requiredField');
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.phone
      );
      Alert.alert('Éxito', 'Cuenta creada correctamente');
     // navigation.navigate('Home');
    }
  };

  return (
    <ScreenWrapper>
      <SectionTitle title={t('register')} />

      <CustomInput
        label={t('firstName')}
        placeholder="Juan"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        error={errors.firstName}
      />

      <CustomInput
        label={t('lastName')}
        placeholder="Pérez"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        error={errors.lastName}
      />

      <CustomInput
        label={t('email')}
        placeholder="correo@example.com"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        error={errors.email}
      />

      <CustomInput
        label={t('phone')}
        placeholder="+57 300 1234567"
        value={formData.phone}
        onChangeText={(text) => setFormData({ ...formData, phone: text })}
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <CustomInput
        label={t('password')}
        placeholder="••••••••"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        error={errors.password}
      />

      <CustomInput
        label={t('confirmPassword')}
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
        secureTextEntry
        error={errors.confirmPassword}
      />

      <CustomButton
        label={t('register')}
        onPress={handleRegister}
        backgroundColor="#2E7D32"
      />

      <CustomButton
        label={t('alreadyHaveAccount')}
        onPress={() => navigation.navigate('Login')}
        backgroundColor="#1565C0"
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({});

export default RegisterScreen;
