import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MarvelButton } from '../components/common/MarvelButton';
import { colors } from '../styles/colors';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.header}>
        <Text style={styles.title}>MARVEL</Text>
        <Image
          source={require('../../assets/MCU_Logo.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Universo Cinematográfico</Text>
      </View>

      <Text style={styles.description}>
        Explora la cronología del MCU, pon a prueba tus conocimientos con el quiz
        y sigue tu progreso con estadísticas y logros.
      </Text>

      <View style={styles.buttons}>
        <MarvelButton
          title="Ver Fases(Movies)"
          onPress={() => navigation.navigate('Timeline')}
          variant="primary"
        />
        <MarvelButton
          title="Jugar Quiz"
          onPress={() => navigation.navigate('Quiz')}
          variant="secondary"
        />
        <MarvelButton
          title="Mis Estadísticas"
          onPress={() => navigation.navigate('Stats')}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    gap: 24,
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
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  buttons: {
    gap: 12,
  },
  logo: {
    width: '100%',
    maxWidth: 320,
    height: 220,
  },
});

export default HomeScreen;
