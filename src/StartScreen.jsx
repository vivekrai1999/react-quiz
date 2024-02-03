import React from 'react'

function StartScreen({numQuestions, dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome to The React Quiz!</h2>
        <h3>{numQuestions.length} Questions to Test Your Mastry</h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type: "active"})}>Let's Start</button>
    </div>
  )
}

export default StartScreen