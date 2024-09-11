import { useState } from 'react'
import './App.css'
import Controller from './components/Controller'
import Viewer from './components/Viewer'

function App() {
  let [count,setCount] = useState(0);
  const onClickBtn = (value) => {
    setCount(count + value)
  }
  return (
    <div className='App'>
      <h1 className='title_counter'>Simple Counter</h1>
      <Viewer count={count}/>
      <Controller onClickBtn={onClickBtn} />
    </div>
  )
}

export default App
