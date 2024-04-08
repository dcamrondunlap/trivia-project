/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import TriviaForm from './components/triviaForm';
import Questions from './components/questions';

function App() {


  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<TriviaForm />} />
          <Route path="/quiz" element={<Questions />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
