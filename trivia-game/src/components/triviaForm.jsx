/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Questions from './questions';
import PropTypes from 'prop-types'



function TriviaForm() {
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [quizData, setQuizData] = useState(null);

  const handleStartQuiz = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:9002/api/trivia/questions', {
        params: {
          amount: numberOfQuestions,
          category,
          difficulty,
          type
        }
      });
      setQuizData(response.data);
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
    }
  };

  return (
    <div>
      <h2 className='font-bold'>Trivia Form</h2>
      <form onSubmit={handleStartQuiz}>
        <label>
          Number of Questions:
          <input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(e.target.value)}
          />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select a category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            {/* Add more category options here */}
          </select>
        </label>
        <label>
          Difficulty:
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Select a difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select a type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
          </select>
        </label>
        <button type="submit"
        className='ml-6 mt-5 font-bold'>Start Quiz</button>
      </form>
      {/* Render Questions component if quizData is available */}
      {quizData && <Questions quizData={quizData} />}
    </div>
  );
}

TriviaForm.propTypes = {
  onStartQuiz: PropTypes.func.isRequired,
}

export default TriviaForm
