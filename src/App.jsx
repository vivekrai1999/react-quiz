import { useEffect, useReducer } from "react"
import Header from "./Header"
import MainApp from "./MainApp"

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading"
}

function reducer(state, action){
  switch(action.type){
    case "dataReceived":
      return {...state, questions: action.payload, status: "ready"}
    case "dataFailed":
      return {...state, status: "error"}
    default:
      throw new Error("Error")
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=>{
    fetch('http://localhost:8000/questions')
    .then(res=>res.json())
    .then(data=>dispatch({type:"dataReceived", payload: data}))
    .catch((err)=>dispatch({type: "dataFailed"}))
  },[])

  return <div className="app">
    <Header />
    <MainApp>
      <p>1/15</p>
    </MainApp>
  </div>
}

export default App
