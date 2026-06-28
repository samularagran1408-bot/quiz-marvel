import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TimelineScreen from '../screens/TimelineScreen';
import QuizScreen from '../screens/QuizScreen';
import StatsScreen from '../screens/StatsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

const tabIcon = (emoji) =>
  ({ color }) => <Text style={{ fontSize: 20, color }}>{emoji}</Text>;

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.backgroundCard,
          borderTopColor: colors.primary,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: tabIcon('🏠'),
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{
          title: 'Fases',
          tabBarIcon: tabIcon('🎬'),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          title: 'Quiz',
          tabBarIcon: tabIcon('🎮'),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          title: 'Estadísticas',
          tabBarIcon: tabIcon('📊'),
        }}
      />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          title: 'Logros',
          tabBarIcon: tabIcon('🏅'),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
