import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { achievements } from '../data/achievements';
import { getUnlockedAchievements } from '../services/storage';
import { colors } from '../styles/colors';

const AchievementsScreen = () => {
  const [unlockedIds, setUnlockedIds] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getUnlockedAchievements().then(setUnlockedIds);
    }, [])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Logros y Medallas</Text>
      <Text style={styles.subtitle}>
        {unlockedIds.length} / {achievements.length} desbloqueados
      </Text>

      {achievements.map((achievement) => {
        const isUnlocked = unlockedIds.includes(achievement.id);

        return (
          <View
            key={achievement.id}
            style={[styles.card, !isUnlocked && styles.cardLocked]}
          >
            <Text style={styles.icon}>{isUnlocked ? achievement.icon : '🔒'}</Text>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, !isUnlocked && styles.lockedText]}>
                {achievement.title}
              </Text>
              <Text style={styles.cardDescription}>{achievement.description}</Text>
            </View>
          </View>
        );
      })}
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
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardLocked: {
    opacity: 0.5,
    borderLeftColor: colors.border,
  },
  icon: {
    fontSize: 36,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  lockedText: {
    color: colors.textSecondary,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default AchievementsScreen;
