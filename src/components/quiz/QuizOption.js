import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

export const QuizOption = ({ text, isSelected, isCorrect, isIncorrect, onSelect }) => {
  const getOptionStyle = () => {
    if (isCorrect) return styles.correctOption;
    if (isIncorrect) return styles.incorrectOption;
    if (isSelected) return styles.selectedOption;
    return styles.defaultOption;
  };

  const getTextStyle = () => {
    if (isCorrect || isIncorrect || isSelected) return styles.selectedText;
    return styles.defaultText;
  };

  /**
   * Renderiza una opción de la lista de opciones del Quiz. Si el usuario selecciona la opción, se activa el evento onSelect. 
   * El estilo de la opción se adapta a su estado (correcto, incorrecto, seleccionado) y al tema de colores definido en el proyecto.
   */
  return (
    <TouchableOpacity
      style={[styles.container, getOptionStyle()]}
      onPress={onSelect} /** Evento de presión del botón de opción, este componente es el hijo y QuizScreen es el padre */
      activeOpacity={0.7}
    >
      <Text style={[styles.text, getTextStyle()]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
  },
  defaultOption: {
    backgroundColor: colors.backgroundCard,
    borderColor: colors.border,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  correctOption: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  incorrectOption: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  text: {
    fontSize: 14,
  },
  defaultText: {
    color: colors.text,
  },
  selectedText: {
    color: colors.text,
    fontWeight: '600',
  },
});