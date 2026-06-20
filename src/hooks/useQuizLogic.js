import { useState, useEffect, useCallback } from 'react';
import { quizQuestions } from '../data/marvelData';
import {
  getQuizProgress,
  saveQuizProgress,
  clearQuizProgress,
  updateStatsAfterQuiz,
  unlockAchievement,
} from '../services/storage';
import { checkNewAchievements } from '../data/achievements';
import { playCorrectSound, playIncorrectSound } from '../services/sounds';

/**
 * useQuizLogic - Hook para la lógica del Quiz.
 * 
 * @returns {Object} - Hook para la lógica del Quiz.
 */
export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [isRestored, setIsRestored] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);

  /**
   * currentQuestion - Pregunta actual.
   */
  const currentQuestion = quizQuestions[currentQuestionIndex];

  /**
   * totalQuestions - Total de preguntas.
   */
  const totalQuestions = quizQuestions.length;

  /**
   * useEffect - Efecto para restaurar el progreso del Quiz.
   */
  useEffect(() => {
    const restoreProgress = async () => {
      const saved = await getQuizProgress();
      if (saved && saved.currentQuestionIndex < totalQuestions) {
        setCurrentQuestionIndex(saved.currentQuestionIndex);
        setScore(saved.score);
      }
      setIsRestored(true);
    };

    restoreProgress();
  }, [totalQuestions]);

  /**
   * persistProgress - Persiste el progreso del Quiz.
   */
  const persistProgress = useCallback(
    async (questionIndex, currentScore) => {
      if (questionIndex >= totalQuestions) {
        await clearQuizProgress();
        return;
      }

      await saveQuizProgress({
        currentQuestionIndex: questionIndex,
        score: currentScore,
      });
    },
    [totalQuestions]
  );

  /**
   * finalizeQuiz - Finaliza el Quiz.
   */
  const finalizeQuiz = async (finalScore) => {
    const stats = await updateStatsAfterQuiz(finalScore, totalQuestions);
    const earned = checkNewAchievements(stats, finalScore, totalQuestions);

    for (const achievementId of earned) {
      await unlockAchievement(achievementId);
    }

    setNewAchievements(earned);
    await clearQuizProgress();
  };

  /**
   * handleAnswer - Maneja la respuesta del usuario.
   */
  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnswerStatus('correct');
      playCorrectSound();
    } else {
      setAnswerStatus('incorrect');
      playIncorrectSound();
    }

    setTimeout(async () => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        const nextIndex = currentQuestionIndex + 1;
        const nextScore = isCorrect ? score + 1 : score;

        setCurrentQuestionIndex(nextIndex);
        setSelectedAnswer(null);
        setAnswerStatus(null);
        await persistProgress(nextIndex, nextScore);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        setShowResult(true);
        await finalizeQuiz(finalScore);
      }
    }, 1000);
  };

  /**
   * resetQuiz - Reinicia el Quiz.
   */
  const resetQuiz = async () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswerStatus(null);
    setNewAchievements([]);
    await clearQuizProgress();
  };

  return {
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
  };
};
