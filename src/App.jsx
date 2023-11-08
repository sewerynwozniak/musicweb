import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp'
import LayoutMain from './components/LayoutMain';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Musics from './components/Musics'
import ProtectedRoutes from './components/ProtectedRoutes';
import { AuthProvider } from './contexts/AuthContext';
import PopupProvider from './contexts/PopupContext';
import Chat from './components/Chat';
import Popup from './components/Popup';



function App() {

 
  return (
    <AuthProvider>
    <PopupProvider>
      <div className="App">
        <Popup />
        <Navbar />
        <Routes>
          <Route element={<LayoutMain />}>
            <Route path='/' element={<Home />}/>
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/signin' element={<SignIn />}/>
            <Route element={<ProtectedRoutes />}>
              <Route path='/music' element={<Musics />}/>
            </Route>
          </Route>
        </Routes> 

      </div>
    </PopupProvider>
    </AuthProvider>

  )
}

export default App
