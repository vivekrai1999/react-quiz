import React from 'react'

function Progress({index, numQuestions, points, maxPossibleScore, answer}) {
  return <header className='progress'>
    <progress max={numQuestions} value={index + Number(answer !== null)}/>
    <p>Question <strong>{index+1}</strong> / {numQuestions} </p>
    <p>Points: <strong>{points}</strong> / {maxPossibleScore}</p>
  </header>
}

export default Progress