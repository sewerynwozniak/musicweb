import React,{useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { currentUser, logOut } = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate();



  return (
    <>
      <div>Home</div>
      <p>Current user: {currentUser && 'mamy usera'}</p>
  
    </>
   
  )

}

export default Home