import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MarvelButton } from '../components/common/MarvelButton';
import { Header } from '../components/common/Header';
import { colors } from '../styles/colors';

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { score, total } = route.params || { score: 0, total: 0 };
  const percentage = (score / total) * 100;

  return (
    <View style={styles.container}>
      <Header title="Resultado Final" showBackButton={true} />
      <View style={styles.content}>
        <Text style={styles.title}>Tu puntuación</Text>
        <Text style={styles.score}>{score} / {total}</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
        <MarvelButton
          title="Jugar de nuevo"
          onPress={() => navigation.navigate('Quiz')}
          variant="primary"
        />
        <MarvelButton
          title="Volver al inicio"
          onPress={() => navigation.navigate('Home')}
          variant="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  percentage: {
    fontSize: 24,
    color: colors.textSecondary,
    marginBottom: 40,
  },
});

export default ResultScreen;