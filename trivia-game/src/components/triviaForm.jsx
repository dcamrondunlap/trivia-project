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
    <div className='absolute inset-0 flex justify-center items-center bg-[#071330]'>
  <div className="p-6 bg-[#0C4160] rounded-xl max-w-xs">
    <h2 className="text-xl font-semibold mb-4 text-center text-[#C3CEDA]">Trivia Form</h2>
    <form onSubmit={handleStartQuiz} className="space-y-4">
      <label className="block">
        <span className="block text-lg text-center text-[#C3CEDA]">Number of Questions</span>
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(e.target.value)}
          className="block w-full border bg-[#738FA7] rounded-md px-4 py-2 text-blue-950"
          max={50}
        />
      </label>

      <label className="block">
        <span className="block text-lg text-center text-[#C3CEDA]">Category</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full border bg-[#738FA7] rounded-md px-4 py-2 text-black"
        >
          <option disabled value=''>Choose a category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals & Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime & Manga</option>
          <option value="32">Entertainment: Cartoon & Animations</option>
        </select>
      </label>

      <label className="block">
        <span className="block text-lg text-center text-[#C3CEDA]">Difficulty</span>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="block w-full border bg-[#738FA7] rounded-md px-4 py-2 text-black"
        >
          <option disabled value=''>Choose a difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <label className="block">
        <span className="block text-lg text-center text-[#C3CEDA]">Type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block w-full border bg-[#738FA7] rounded-md px-4 py-2 text-black"
        >
          <option disabled value=''>Choose a type</option>
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </label>

      <button type="submit" className="btn bg-[#071330] text-[#C3CEDA] hover:bg-[#738FA7] hover:text-black block mx-auto px-6 rounded-md">
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
