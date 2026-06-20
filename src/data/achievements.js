export const achievements = [
  {
    id: 'first_game',
    title: 'Primer Héroe',
    description: 'Completa tu primera partida',
    icon: '🦸',
  },
  {
    id: 'perfect_score',
    title: 'Vengador Perfecto',
    description: 'Obtén 100% en un quiz',
    icon: '🏆',
  },
  {
    id: 'fan_10',
    title: 'Fan del MCU',
    description: 'Responde 10 preguntas correctamente',
    icon: '⭐',
  },
  {
    id: 'veteran',
    title: 'Veterano',
    description: 'Juega 5 partidas',
    icon: '🛡️',
  },
  {
    id: 'high_scorer',
    title: 'Maestro Marvel',
    description: 'Consigue al menos 4/5 en un quiz',
    icon: '💎',
  },
];

export function checkNewAchievements(stats, score, totalQuestions) {
  const unlocked = [];

  if (stats.gamesPlayed >= 1) {
    unlocked.push('first_game');
  }
  if (score === totalQuestions && totalQuestions > 0) {
    unlocked.push('perfect_score');
  }
  if (stats.correctAnswers >= 10) {
    unlocked.push('fan_10');
  }
  if (stats.gamesPlayed >= 5) {
    unlocked.push('veteran');
  }
  if (score >= 4) {
    unlocked.push('high_scorer');
  }

  return unlocked;
}
