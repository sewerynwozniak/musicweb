import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Music from './components/Music'
import ProtectedRoutes from './components/ProtectedRoutes';
import { AuthProvider } from './contexts/AuthContext';


function App() {


  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
  
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route element={<ProtectedRoutes />}>
            <Route path='/music' element={<Music />}/>
          </Route>

        </Routes> 

      </div>
    </AuthProvider>

  )
}

export default App
