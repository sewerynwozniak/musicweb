import React from 'react'
import {Outlet} from 'react-router-dom'
import Signup from './Signup';

const userAuth = true;

const ProtectedRoutes = () => {

 
return userAuth?( 
    <>
  
        <Outlet /> 
    </>


)
: <Signup />

}

export default ProtectedRoutes