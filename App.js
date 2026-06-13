import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TimelineScreen from './src/screens/TimelineScreen';
import QuizScreen from './src/screens/QuizScreen';
import { colors } from './src/styles/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'MARVEL QUIZ' }} />
        <Stack.Screen name="Timeline" component={TimelineScreen} options={{ title: 'Cronología MCU' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz Marvel' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}