import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';

export const Header = ({ title, showBackButton = false }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  /**
   * Renderiza el componente Header con un título centrado y un botón de retroceso opcional a la izquierda. 
   * Si showBackButton es true, se muestra el botón de retroceso que permite al usuario volver a la pantalla anterior. 
   * El diseño del header se adapta al tema de colores definido en el proyecto.
   */
  return (
    <View style={styles.container}>
      {showBackButton ? (
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
});