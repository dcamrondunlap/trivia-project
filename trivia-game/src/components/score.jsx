/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from 'react'

function Score({score, totalQuestions}) {
  return (
    <div>
      <h2>Your score: {score}/{totalQuestions}</h2>
    </div>
  )
}

export default Score


