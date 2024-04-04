/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Questions() {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state.quizData

  console.log('Location state:', location.state);
  console.log('Quiz data:', quizData);

  const handleStartOver = () => {
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Here's your Quiz</h1>
      <ul>
        {(quizData && quizData.results && Array.isArray(quizData.results) && quizData.results.length > 0) ? (
          quizData.results.map((question, index) => (
            <li key={index} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
              <ol className="list-decimal ml-6">
                {question.options && Array.isArray(question.options) ? (
                  question.options.map((option, optionIndex) => (
                    <li key={optionIndex} className="mb-2">{option}</li>
                  ))
                ) : null}
              </ol>
            </li>
          ))
        ) : (
          <li>No quiz data available</li>
        )}
      </ul>
      <button className="btn mt-4" onClick={handleStartOver}>Start Over</button>
    </div>
  );
}

export default Questions
