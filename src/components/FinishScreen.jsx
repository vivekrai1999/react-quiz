import React from 'react'

function FinishScreen({points,maxPossibleScore}) {
  const percentage = (points/maxPossibleScore) * 100
  let emoji;
  if(percentage===100) emoji = "🥇"
  if(percentage>=80 && percentage<100) emoji = "🥳"
  if(percentage>=50 && percentage<80) emoji = "🤨"
  if(percentage>0 && percentage<50) emoji = "🙃"
  if(percentage===0) emoji = "😔"
  return (
    <p className='result'>
        <sapn>{emoji}</sapn> You Scored <strong>{points}</strong> Out of <strong>{maxPossibleScore}</strong> ({Math.ceil(percentage)}%)
    </p>
  )
}

export default FinishScreen