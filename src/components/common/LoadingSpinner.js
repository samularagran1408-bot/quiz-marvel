import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

/**
 * LoadingSpinner - Componente de carga en pantalla.
 * 
 * @returns {React.ReactNode} - Componente de carga en pantalla.
 */
export const LoadingSpinner = () => {
  /**
   * Renderiza un indicador de carga en pantalla mientras se está cargando la pantalla.
   */
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});