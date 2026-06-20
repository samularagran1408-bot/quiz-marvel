import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';

/**
 * SplashScreen - Pantalla de bienvenida con animación
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.onFinish - Función que se ejecuta cuando termina la animación
 * 
 * Esta pantalla muestra un logo animado y un mensaje de carga
 * durante 2 segundos antes de pasar a la siguiente pantalla.
 */
const SplashScreen = ({ onFinish }) => {
    /**
     * fadeAnim - Controla la animación de desvanecimiento (fade)
     */
    const fadeAnim = useRef(new Animated.Value(0)).current;

    /**
     * scaleAnim - Controla la animación de escala (zoom) en el logo de Avengers
     */
    const scaleAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();

        setTimeout(() => {
            onFinish(); /** Llama a la función para pasar a la siguiente pantalla */
        }, 2000); /** Espera 2 segundos antes de pasar a la siguiente pantalla */
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Animated.Image
                source={require('../../../assets/avengers-logo.jpg')}
                style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
                resizeMode="contain"
            />
            <Text style={styles.title}>MARVEL QUIZ</Text>
            <Text style={styles.subtitle}>Cargando...</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: colors.text,
  },
});

export default SplashScreen;