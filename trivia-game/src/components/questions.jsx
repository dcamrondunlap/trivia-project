/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Score from './score';

function Questions({ quizData }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelected = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizData.results.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleStartOver = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleStartNewQuiz = () => {
    window.location.reload();
  }

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };


  return (
    <div className='absolute inset-0 flex justify-center items-center bg-[#071330]'>
  <div className="container mx-auto px-8 py-12 bg-[#0C4160] w-2/3 min-[375px]:w-full">
    <h1 className="text-2xl font-bold mb-4 text-center text-[#C3CEDA]">Here's your Quiz!</h1>
    {!quizCompleted && quizData && quizData.results && quizData.results.length > 0 && (
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold mb-2 text-[#C3CEDA]" dangerouslySetInnerHTML={{__html: quizData.results[currentQuestionIndex].question}}></h3>
        <ol className="items-center ">
          {shuffleArray([...quizData.results[currentQuestionIndex].incorrect_answers, quizData.results[currentQuestionIndex].correct_answer]).map((option, optionIndex) => (
            <li key={optionIndex} className="mb-2">
              <button className="btn btn-ghost text-lg focus:outline-none focus:ring-0 text-[#C3CEDA] hover:bg-[#738FA7]" onClick={() => handleAnswerSelected(option === quizData.results[currentQuestionIndex].correct_answer)} dangerouslySetInnerHTML={{__html: option.replace(/quot;/g, '"').replace(/&#039;/g, "'")}}></button>
            </li>
          ))}
        </ol>
        <div className='text-md font-bold items-center'>{currentQuestionIndex +1}/{quizData.results.length}</div>
      </div>
    )}
    {quizCompleted && (
      <div className="mb-6 flex justify-center text-[#C3CEDA]">
        <Score score={score} totalQuestions={quizData.results.length} />
      </div>
    )}
    <div className="flex justify-center">
      {quizCompleted && (
        <>
          <button className="btn mr-4 bg-[#071330] text-[#C3CEDA] hover:bg-[#738FA7]" onClick={handleStartOver}>Retry Quiz</button>
          <button className='btn ml-4 bg-[#071330] text-[#C3CEDA] hover:bg-[#738FA7]' onClick={handleStartNewQuiz}>
            Start New Quiz
          </button>
        </>
      )}
    </div>
  </div>
</div>
  );
}

Questions.propTypes = {
  quizData: PropTypes.object.isRequired, // Validate that quizData is an object and required
};

export default Questions
