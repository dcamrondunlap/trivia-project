/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react'

function Score({score, totalQuestions}) {
  return (
    <div className='text-bold'>
      <h2 className='text-bold'>Your score: {score}/{totalQuestions}</h2>
    </div>
  )
}

export default Score
