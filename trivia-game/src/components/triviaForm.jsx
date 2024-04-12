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
      const response = await axios.get('https://opentdb.com/api.php', {
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
    <div className='absolute inset-0 flex justify-center items-center bg-gray-300'>
  <div className="p-6 bg-gray-300 rounded-xl max-w-xs">
    <h2 className="text-xl font-semibold mb-4 text-center">Trivia Form</h2>
    <form onSubmit={handleStartQuiz} className="space-y-4">
      <label className="block">
        <span className="block text-lg text-center">Number of Questions</span>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
          className="block w-full border border-gray-400 rounded-md px-4 py-2"
          max={50}
        />
      </label>

      <label className="block">
        <span className="block text-lg text-center">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full border border-gray-400 rounded-md px-4 py-2"
        >
          {/* Options */}
        </select>
      </label>

      <label className="block">
        <span className="block text-lg text-center">Difficulty</span>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="block w-full border border-gray-400 rounded-md px-4 py-2"
        >
          <option disabled value=''>Choose a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <label className="block">
        <span className="block text-lg text-center">Type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-full border border-gray-400 rounded-md px-4 py-2"
        >
          <option disabled value=''>Choose a type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </label>

      <button type="submit" className="btn bg-blue-500 text-white block mx-auto px-6 rounded-md">
        Start Quiz!
      </button>
    </form>
    {/* Render Questions component if quizData is available */}
    {quizData && <Questions quizData={quizData} />}
  </div>
</div>
  );
}

TriviaForm.propTypes = {
  onStartQuiz: PropTypes.func.isRequired,
}

export default TriviaForm
