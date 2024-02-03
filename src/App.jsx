import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import MainApp from "./components/MainApp"
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0
}

function reducer(state, action){
  switch(action.type){
    case "dataReceived":
      return {...state, questions: action.payload, status: "ready"}
    case "dataFailed":
      return {...state, status: "error"}
    case "active":
      return {...state, status: "start"}
    default:
      throw new Error("Error")
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {questions, status, index} = state
  const numQuestions = questions.length
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
      {status === "start" && <Question question={questions[index]}/>}
    </MainApp>  
  </div>
}

export default App
