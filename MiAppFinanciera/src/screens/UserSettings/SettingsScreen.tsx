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
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface SettingsScreenProps {
  navigation: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    email: user?.email || '',
  });

  const handleSaveSettings = () => {
    Alert.alert('Éxito', 'Configuración guardada correctamente');
  };

  const handleToggleLanguage = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
    Alert.alert('Idioma', `Idioma cambiado a L {newLanguage === 'es' ? 'Español' : 'English'}`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', onPress: () => {} },
        {
          text: 'Cerrar Sesión',
          onPress: () => {
            logout();
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle title={t('settings')} />

        <CustomInput
          label="Nombre"
          placeholder="Tu nombre"
          value={profileData.firstName}
          onChangeText={(text) =>
            setProfileData({ ...profileData, firstName: text })
          }
        />

        <CustomInput
          label="Correo"
          placeholder="tu@email.com"
          value={profileData.email}
          onChangeText={(text) =>
            setProfileData({ ...profileData, email: text })
          }
          keyboardType="email-address"
        />

        <CustomButton
          label="Guardar Cambios"
          onPress={handleSaveSettings}
          backgroundColor="#2E7D32"
        />

        <CustomButton
          label={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          onPress={handleToggleLanguage}
          backgroundColor="#1565C0"
        />

        <CustomButton
          label={t('logout')}
          onPress={handleLogout}
          backgroundColor="#D32F2F"
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
