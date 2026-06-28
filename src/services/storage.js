/**
 * módulo que permite guardar y recuperar datos en el almacenamiento local del usuario
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Clave para las estadísticas de la aplicación
 */
const KEYS = {
  STATS: '@marvel_quiz_stats',
  ACHIEVEMENTS: '@marvel_quiz_achievements',
  QUIZ_PROGRESS: '@marvel_quiz_progress',
};

/**
 * Estadísticas por defecto cuando no hay datos guardados
 */
export const defaultStats = {
  gamesPlayed: 0,
  bestScore: 0,
  totalQuestions: 0,
  correctAnswers: 0,
};

/**
 * Obtiene las estadísticas guardadas del almacenamiento local
 * @returns Objeto con las estadísticas del usuario
 */
export async function getStats() {
  try {
    const data = await AsyncStorage.getItem(KEYS.STATS);
    return data ? { ...defaultStats, ...JSON.parse(data) } : { ...defaultStats };
  } catch {
    return { ...defaultStats };
  }
}

/**
 * Guarda las estadísticas en el almacenamiento local
 * @param stats - Estadísticas a guardar
 */
export async function saveStats(stats) {
  await AsyncStorage.setItem(KEYS.STATS, JSON.stringify(stats));
}

/**
 * Actualiza las estadísticas después de completar un quiz
 * @param score - Puntaje obtenido en el quiz
 * @param totalQuestions - Total de preguntas del quiz
 * @returns Estadísticas actualizadas
 */
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

/**
 * Obtiene los logros desbloqueados por el usuario
 * @returns Lista de IDs de logros desbloqueados
 */
export async function getUnlockedAchievements() {
  try {
    const data = await AsyncStorage.getItem(KEYS.ACHIEVEMENTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Desbloquea un nuevo logro para el usuario
 * @param achievementId - ID del logro a desbloquear
 * @returns Lista actualizada de logros desbloqueados
 */
export async function unlockAchievement(achievementId) {
  const unlocked = await getUnlockedAchievements();
  if (unlocked.includes(achievementId)) {
    return unlocked;
  }
  const updated = [...unlocked, achievementId];
  await AsyncStorage.setItem(KEYS.ACHIEVEMENTS, JSON.stringify(updated));
  return updated;
}

/**
 * Obtiene el progreso guardado del quiz
 * @returns Progreso del quiz o null si no existe
 */
export async function getQuizProgress() {
  try {
    const data = await AsyncStorage.getItem(KEYS.QUIZ_PROGRESS);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Guarda el progreso del quiz en el almacenamiento local
 * @param progress - Progreso del quiz a guardar
 */
export async function saveQuizProgress(progress) {
  await AsyncStorage.setItem(KEYS.QUIZ_PROGRESS, JSON.stringify(progress));
}

/**
 * Elimina el progreso guardado del quiz
 */
export async function clearQuizProgress() {
  await AsyncStorage.removeItem(KEYS.QUIZ_PROGRESS);
}
