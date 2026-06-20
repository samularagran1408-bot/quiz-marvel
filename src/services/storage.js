import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  STATS: '@marvel_quiz_stats',
  ACHIEVEMENTS: '@marvel_quiz_achievements',
  QUIZ_PROGRESS: '@marvel_quiz_progress',
};

export const defaultStats = {
  gamesPlayed: 0,
  bestScore: 0,
  totalQuestions: 0,
  correctAnswers: 0,
};

export async function getStats() {
  try {
    const data = await AsyncStorage.getItem(KEYS.STATS);
    return data ? { ...defaultStats, ...JSON.parse(data) } : { ...defaultStats };
  } catch {
    return { ...defaultStats };
  }
}

export async function saveStats(stats) {
  await AsyncStorage.setItem(KEYS.STATS, JSON.stringify(stats));
}

export async function updateStatsAfterQuiz(score, totalQuestions) {
  const stats = await getStats();
  const updated = {
    gamesPlayed: stats.gamesPlayed + 1,
    bestScore: Math.max(stats.bestScore, score),
    totalQuestions: stats.totalQuestions + totalQuestions,
    correctAnswers: stats.correctAnswers + score,
  };
  await saveStats(updated);
  return updated;
}

export async function getUnlockedAchievements() {
  try {
    const data = await AsyncStorage.getItem(KEYS.ACHIEVEMENTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function unlockAchievement(achievementId) {
  const unlocked = await getUnlockedAchievements();
  if (unlocked.includes(achievementId)) {
    return unlocked;
  }
  const updated = [...unlocked, achievementId];
  await AsyncStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(updated));
  return updated;
}

export async function getQuizProgress() {
  try {
    const data = await AsyncStorage.getItem(KEYS.QUIZ_PROGRESS);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function saveQuizProgress(progress) {
  await AsyncStorage.setItem(KEYS.QUIZ_PROGRESS, JSON.stringify(progress));
}

export async function clearQuizProgress() {
  await AsyncStorage.removeItem(KEYS.QUIZ_PROGRESS);
}
