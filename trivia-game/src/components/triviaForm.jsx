/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'


function TriviaForm() {
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    try {
      const response = await axios.get('http://localhost:9002/api/trivia/questions', {
        params: {
          amount: numberOfQuestions,
          category,
          difficulty,
          type
        }
      });
      console.log('Fetched trivia questions:', response.data);
      navigate('/quiz', { state: { quizData: response.data } });
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
    }
  };

  return (
    <div className='absolute inset-0 flex justify-center items-center bg-[#071330]'>
      <div className="p-6 bg-[#0C4160] rounded-xl max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-[#C3CEDA]">Create your Game!</h2>
        <div className="space-y-4">
          <label className="block" onClick={handleStartQuiz} style={{ cursor: 'pointer' }}>
            <span className="block text-lg text-center text-[#C3CEDA]">Start!</span>
          </label>
          <input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(e.target.value)}
            className="block w-full border bg-[#738FA7] rounded-md px-4 py-2"
            max={50}
            placeholder="Number of Questions"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full border bg-[#738FA7] rounded-md px-4 py-2"
          >
            <option disabled value=''>Choose a category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            {/* Include other category options */}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="block w-full border bg-[#738FA7] rounded-md px-4 py-2"
          >
            <option disabled value=''>Choose a difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            {/* Include other difficulty options */}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="block w-full border bg-[#738FA7] rounded-md px-4 py-2"
          >
            <option disabled value=''>Choose a type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
            {/* Include other type options */}
          </select>
        </div>
      </div>
    </div>
  );
}



export default TriviaForm
