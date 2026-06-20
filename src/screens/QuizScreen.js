import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { QuizOption } from '../components/quiz/QuizOption';
import { MarvelButton } from '../components/common/MarvelButton';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { achievements } from '../data/achievements';
import { colors } from '../styles/colors';

const QuizScreen = () => {
  const navigation = useNavigation();
  const {
    currentQuestion,
    currentQuestionIndex,
    score,
    selectedAnswer,
    showResult,
    answerStatus,
    totalQuestions,
    isRestored,
    newAchievements,
    handleAnswer,
    resetQuiz,
  } = useQuizLogic();

  if (!isRestored) {
    return <LoadingSpinner />;
  }

  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const earnedAchievements = achievements.filter((a) =>
      newAchievements.includes(a.id)
    );

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.resultScroll}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Tu puntuación</Text>
          <Text style={styles.resultScore}>
            {score} / {totalQuestions}
          </Text>
          <Text style={styles.resultPercentage}>{percentage}%</Text>

          {earnedAchievements.length > 0 && (
            <View style={styles.achievementsBox}>
              <Text style={styles.achievementsTitle}>¡Nuevos logros!</Text>
              {earnedAchievements.map((achievement) => (
                <Text key={achievement.id} style={styles.achievementItem}>
                  {achievement.icon} {achievement.title}
                </Text>
              ))}
            </View>
          )}

          <MarvelButton title="Jugar de nuevo" onPress={resetQuiz} variant="primary" />
          <MarvelButton
            title="Ver estadísticas"
            onPress={() => navigation.navigate('Stats')}
            variant="secondary"
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.progress}>
        Pregunta {currentQuestionIndex + 1} de {totalQuestions}
      </Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <View style={styles.options}>
        {currentQuestion.options.map((option) => (
          <QuizOption
            key={option}
            text={option}
            isSelected={selectedAnswer === option}
            isCorrect={answerStatus === 'correct' && selectedAnswer === option}
            isIncorrect={answerStatus === 'incorrect' && selectedAnswer === option}
            onSelect={() => !selectedAnswer && handleAnswer(option)}
          />
        ))}
      </View>
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
  progress: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  options: {
    gap: 4,
  },
  resultScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  resultContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  resultPercentage: {
    fontSize: 24,
    color: colors.textSecondary,
    marginBottom: 30,
  },
  achievementsBox: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  achievementItem: {
    fontSize: 16,
    color: colors.text,
    marginVertical: 4,
  },
});

export default QuizScreen;
