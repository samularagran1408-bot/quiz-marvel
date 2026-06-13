import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { QuizOption } from '../components/quiz/QuizOption';
import { Header } from '../components/common/Header';
import { MarvelButton } from '../components/common/MarvelButton';
import { useQuizLogic } from '../hooks/useQuizLogic';
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
    handleAnswer,
    resetQuiz,
  } = useQuizLogic();

  if (showResult) {
    const percentage = (score / totalQuestions) * 100;
    return (
      <View style={styles.container}>
        <Header title="Resultado Final" showBackButton={true} />
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>🏆 Tu puntuación</Text>
          <Text style={styles.resultScore}>{score} / {totalQuestions}</Text>
          <Text style={styles.resultPercentage}>{percentage}%</Text>
          <MarvelButton
            title="Jugar de nuevo"
            onPress={resetQuiz}
            variant="primary"
          />
          <MarvelButton
            title="← Volver al inicio"
            onPress={() => navigation.navigate('Home')}
            variant="secondary"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title={`Quiz (${currentQuestionIndex + 1}/${totalQuestions})`} showBackButton={true} />
      <View style={styles.content}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  options: {
    flex: 1,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
    marginBottom: 40,
  },
});

export default QuizScreen;