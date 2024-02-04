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

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0
}

function reducer(state, action){
  switch(action.type){
    case "dataReceived":
      return {...state, questions: action.payload, status: "ready"}
    case "dataFailed":
      return {...state, status: "error"}
    case "active":
      return {...state, status: "start"}
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
      return {...state, status: "finished"}
    default:
      throw new Error("Error")
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {questions, status, index, answer, points} = state
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
        <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
      </>
      }
      {status === "finished" && <FinishScreen points={points} maxPossibleScore={maxPossibleScore}/>}
    </MainApp>  
  </div>
}

export default App
