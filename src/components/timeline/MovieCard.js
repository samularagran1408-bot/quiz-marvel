import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const MovieCard = ({ title, year, phase, order }) => {
  /**
   * Renderiza una tarjeta que muestra información sobre una película del Universo Cinematográfico de Marvel (MCU). 
   * La tarjeta incluye el título de la película, el año de lanzamiento, la fase a la que pertenece y su orden en la cronología del 
   * MCU. El diseño de la tarjeta se adapta al tema de colores definido en el proyecto, con un estilo limpio y moderno para resaltar 
   * la información clave de cada película.
   */
  return (
    <View style={styles.container}>
      <View style={styles.orderContainer}>
        <Text style={styles.orderText}>{order}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>{year}</Text>
          <Text style={styles.detailText}>Fase {phase}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  orderContainer: {
    backgroundColor: colors.primary,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});