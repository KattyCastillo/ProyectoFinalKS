import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Componente que sirve como placeholder para mostrar que la app 
 * está lista para usar imágenes locales
 */
interface ImagePlaceholderProps {
  text: string;
  size?: number;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  text,
  size = 100,
}) => {
  return (
    <View
      style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      <Text style={styles.placeholderText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '600',
  },
});

export default ImagePlaceholder;
