/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import TriviaForm from './components/triviaForm';
import Questions from './components/questions';

function App() {

  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div>
      {!quizStarted && <TriviaForm onStartQuiz={startQuiz} />}
      {quizStarted && <Questions />}
    </div>
  );
}

export default App
