/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Score from './score';

function Questions() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state.quizData

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  console.log('Location state:', location.state);
  console.log('Quiz data:', quizData);

  const handleAnswerSelected = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1); // Increase score if answer is correct
    }
    // Move to next question
    if (currentQuestionIndex < quizData.results.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true); // Mark quiz as completed
    }
  };

  const handleStartOver = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.results.length -1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }

  const handleCreateNewQuiz = () => {
    navigate('/')
  }

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Here's your Quiz</h1>
      {!quizCompleted && quizData && quizData.results && quizData.results.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2" dangerouslySetInnerHTML={{__html: quizData.results[currentQuestionIndex].question}}></h3>
          <ol className="list-decimal ml-6">
            {shuffleArray([...quizData.results[currentQuestionIndex].incorrect_answers, quizData.results[currentQuestionIndex].correct_answer]).map((option, optionIndex) => (
              <li key={optionIndex} className="mb-2">
                <button className="btn btn-ghost" onClick={() => handleAnswerSelected(option === quizData.results[currentQuestionIndex].correct_answer)}>{option.replace(/quot;/g, '"').replace(/&#039;/g, "'")}</button>
              </li>
            ))}
          </ol>
        </div>
      )}
      {quizCompleted && (
        <div className="mb-6">
          <Score score={score} totalQuestions={quizData.results.length} />
        </div>
      )}
      <div className="flex justify-between">
        {quizCompleted && (
          <>
            <button className="btn" onClick={handleStartOver}>Retry Quiz</button>
            <button className="btn" onClick={handleCreateNewQuiz}>Start New Quiz</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Questions
