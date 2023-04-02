import React from 'react'
import {Outlet} from 'react-router-dom'
import Signup from './SignUp';
import { useAuth } from '../contexts/AuthContext'




const ProtectedRoutes = () => {
   

const { currentUser } = useAuth()

 
return currentUser?( 
    <>
  
        <Outlet /> 
    </>


)
: <Signup />

}

export default ProtectedRoutes