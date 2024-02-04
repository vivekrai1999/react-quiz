import React from 'react'

function FinishScreen({points,maxPossibleScore, highscore, dispatch}) {
  const percentage = (points/maxPossibleScore) * 100
  let emoji;
  if(percentage===100) emoji = "🥇"
  if(percentage>=80 && percentage<100) emoji = "🥳"
  if(percentage>=50 && percentage<80) emoji = "🤨"
  if(percentage>0 && percentage<50) emoji = "🙃"
  if(percentage===0) emoji = "😔"
  return (
    <>
    <p className='result'>
        <sapn>{emoji}</sapn> You Scored <strong>{points}</strong> Out of <strong>{maxPossibleScore}</strong> ({Math.ceil(percentage)}%)
    </p>
    <p className='highscore'>(Highscore: {highscore} points)</p>
    <button onClick={()=>dispatch({type: "reset"})} className='btn btn-ui'>Restart Quiz</button>
    </>
  )
}

export default FinishScreen