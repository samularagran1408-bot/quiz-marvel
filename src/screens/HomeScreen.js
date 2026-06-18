import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MarvelButton } from '../components/common/MarvelButton';
import { colors } from '../styles/colors';

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToTimeline = () => navigation.navigate('Timeline');
  const navigateToQuiz = () => navigation.navigate('Quiz');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MARVEL</Text>
        <Image
          source={require('../../assets/MCU_Logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Universo Cinematográfico</Text>
      </View>
      <View style={styles.buttons}>
        <MarvelButton
          title="Ver Cronología"
          onPress={navigateToTimeline}
          variant="primary"
        />
        <MarvelButton
          title="Jugar Quiz"
          onPress={navigateToQuiz}
          variant="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    gap: 35,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 700,
    textDecorationLine: 'underline',
  },
  buttons: {
    marginBottom: 40,
  },
  logo: {
    width: 450,
    height: 320,
    marginBottom: 10,
  },
});

export default HomeScreen;