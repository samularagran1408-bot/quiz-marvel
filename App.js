import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import SplashScreen from './src/components/common/SplashScreen';
import { initSounds } from './src/services/sounds';

/**
 * App - Componente principal de la aplicación.
 * 
 * @returns {React.ReactNode} - Componente de la aplicación.
 */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  /**
   * Inicializa los sonidos de la aplicación.
   */
  useEffect(() => {
    initSounds();
  }, []);

  /**
   * Si showSplash es true, muestra la pantalla de splash.
   */
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  /**
   * Renderiza el componente NavigationContainer con el MainNavigator como pantalla principal.
   */
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
