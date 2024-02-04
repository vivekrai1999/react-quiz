import React, { useEffect } from 'react'

function Timer({secondsRemaining, dispatch}) {
    const minutes = Math.floor(secondsRemaining / 60)
    const seconds = secondsRemaining % 60
  useEffect(()=>{
    const i = setInterval(()=>dispatch({type: "timer"}),1000)
    return ()=>clearInterval(i)
  },[dispatch])
  return (
    <div className='timer'>{minutes < 10 && "0"}{minutes}:{seconds < 10 && "0"}{seconds}</div>
  )
}

export default Timer