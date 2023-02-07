import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {Routes, Route} from 'react-router-dom';
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Music from './components/Music'


function App() {


  return (
    <div className="App">
      <Navbar />
     

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/music' element={<Music />}/>
      </Routes> 

    </div>
  )
}

export default App
