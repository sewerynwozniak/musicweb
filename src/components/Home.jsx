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

      {currentUser?(
                currentUser.email
            ):(
              null
          )}

      <p>Current user: {currentUser && currentUser.email}</p>
  
    </>
   
  )

}

export default Home