import React,{useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import FormDemo from './radix-components/Form';

const Home = () => {

  const { currentUser, logOut } = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate();



  return (
    <>
      
   
      {currentUser?(
                currentUser.email
            ):(
              null
          )}

      <p>Current user: {currentUser && currentUser.email}</p>
  

              <FormDemo />
     

    </>
   
  )

}

export default Home