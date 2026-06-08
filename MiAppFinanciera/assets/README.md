import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

/**
 * Componente ejemplo que demuestra el uso de imágenes locales
 * Las imágenes deben ser colocadas en la carpeta assets/
 */
export const ImageExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Imágenes Locales</Text>
      
      {/* Ejemplo de imagen local - Descomentar cuando las imágenes estén disponibles */}
      {/* 
      <Image
        source={require('./logo.png')}
        style={styles.logo}
      />
      */}
      
      <Text style={styles.info}>
        Coloca las imágenes PNG en esta carpeta (assets/)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginVertical: 12,
  },
  info: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
