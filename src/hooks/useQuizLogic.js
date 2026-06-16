import { useState } from 'react';
import { quizQuestions } from '../data/marvelData';

export const useQuizLogic = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); /** Índice de la pregunta actual */
  const [score, setScore] = useState(0); /** Puntuación actual */
  const [selectedAnswer, setSelectedAnswer] = useState(null); /** Opción seleccionada por el usuario */
  const [showResult, setShowResult] = useState(false); /** Indica si se debe mostrar la pantalla de resultados al finalizar el quiz */
  const [answerStatus, setAnswerStatus] = useState(null); /** 'correct' or 'incorrect' */

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;

  const handleAnswer = (selectedOption) => {
    setSelectedAnswer(selectedOption);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < totalQuestions) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswerStatus(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswerStatus(null);
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    score,
    selectedAnswer,
    showResult,
    answerStatus,
    totalQuestions,
    handleAnswer,
    resetQuiz,
  };
};