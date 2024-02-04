import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import MainApp from "./components/MainApp"
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import NextButton from "./components/NextButton"
import Progress from "./components/Progress"
import FinishScreen from "./components/FinishScreen"
import Timer from "./components/Timer"
import Footer from "./components/Footer"

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
}

function reducer(state, action){
  switch(action.type){
    case "dataReceived":
      return {...state, questions: action.payload, status: "ready"}
    case "dataFailed":
      return {...state, status: "error"}
    case "active":
      return {...state, status: "start", secondsRemaining: state.questions.length * SECS_PER_QUESTION}
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
         answer: action.payload,
         points: action.payload === question.correctOption  ? state.points + question.points : state.points
        }
    case "nextQuestion":
      return {...state, index: state.index + 1, answer: null}
    case "finished":
      return {...state, status: "finished", highscore: state.highscore > state.points ? state.highscore : state.points}
    case "reset":
      return {...initialState, questions: state.questions, status: "ready"}
    case "timer":
      return {...state, secondsRemaining: state.secondsRemaining - 1, status: state.secondsRemaining===0 ? "finished" : state.status}
    default:
      throw new Error("Error")
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {questions, status, index, answer, points, highscore, secondsRemaining} = state
  const numQuestions = questions.length
  const maxPossibleScore = questions.reduce((prev, curr)=>prev+curr.points,0)
  useEffect(()=>{
    fetch('http://localhost:8000/questions')
    .then(res=>res.json())
    .then(data=>dispatch({type:"dataReceived", payload: data}))
    .catch((err)=>dispatch({type: "dataFailed"}))
  },[])

  return <div className="app">
    <Header />
    <MainApp>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
      {status === "start" && 
      <>
        <Progress index={index} numQuestions={numQuestions} points={points} maxPossibleScore={maxPossibleScore} answer={answer}/>
        <Question dispatch={dispatch} answer={answer} question={questions[index]}/>
        <Footer>
          <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
        </Footer>
      </>
      }
      {status === "finished" && <FinishScreen dispatch={dispatch} highscore={highscore} points={points} maxPossibleScore={maxPossibleScore}/>}
    </MainApp>  
  </div>
}

export default App
