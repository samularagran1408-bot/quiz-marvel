import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStats } from '../services/storage';
import { colors } from '../styles/colors';

/**
 * StatsScreen - Componente de la pantalla de estadísticas.
 * 
 * @returns {React.ReactNode} - Componente de la pantalla de estadísticas.
 */
const StatsScreen = () => {
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    bestScore: 0,
    totalQuestions: 0,
    correctAnswers: 0,
  });

  /**
   * Obtiene las estadísticas de la aplicación.
   */
  useFocusEffect(
    useCallback(() => {
      getStats().then(setStats);
    }, [])
  );

  /**
   * Calcula el porcentaje de respuestas correctas.
   */
  const percentage =
    stats.totalQuestions > 0
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0;

  /**
   * Renderiza la pantalla de estadísticas.
   */
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Estadísticas</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Partidas jugadas</Text>
        <Text style={styles.cardValue}>{stats.gamesPlayed}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mejor puntaje</Text>
        <Text style={styles.cardValue}>{stats.bestScore}/5</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Preguntas respondidas</Text>
        <Text style={styles.cardValue}>{stats.totalQuestions}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Respuestas correctas</Text>
        <Text style={styles.cardValue}>{stats.correctAnswers}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Precisión</Text>
        <Text style={styles.cardValue}>{percentage}%</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  card: {
    backgroundColor: colors.backgroundCard,
    padding: 20,
    borderRadius: 12,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default StatsScreen;
