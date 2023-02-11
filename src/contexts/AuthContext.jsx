import React, { createContext, useContext, useState } from 'react'
import {auth} from '../firebase'

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState()

    function signUp(email, password){
        auth.createUserWithEmailAndPassword(email, password)
    }

    auth.onAuthStateChanged(user=>{
        setCurrentUser(user)
    })

    value={
        currentUser
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext