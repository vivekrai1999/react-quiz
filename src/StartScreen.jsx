import React from 'react'

function StartScreen({numQuestions}) {
  return (
    <div className='start'>
        <h2>Welcome to The React Quiz!</h2>
        <h3>{numQuestions.length} Questions to Test Your Mastry</h3>
        <button className='btn btn-ui'>Let's Start</button>
    </div>
  )
}

export default StartScreen