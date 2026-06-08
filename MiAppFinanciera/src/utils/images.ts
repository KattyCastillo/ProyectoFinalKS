// Ejemplo de uso de imágenes locales en la aplicación
import type { ImageSourcePropType } from 'react-native';

export interface LocalImage {
  name: string;
  uri: ImageSourcePropType;
  description: string;
}

/**
 * Gestión centralizada de imágenes locales
 * Cuando agregues imágenes PNG/JPG en assets/, actualiza este archivo
 */
export const localImages: Record<string, LocalImage> = {
  // logo: {
  //   name: 'Logo',
  //   uri: require('../assets/logo.png'),
  //   description: 'Logo de la aplicación',
  // },
  // icon: {
  //   name: 'Icono',
  //   uri: require('../assets/icon.png'),
  //   description: 'Icono de la aplicación',
  // },
  // splash: {
  //   name: 'Splash',
  //   uri: require('../assets/splash.png'),
  //   description: 'Pantalla de carga',
  // },
};
