import React, {useState} from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'

 

const Navbar = () => {

    const {currentUser, logOut} = useAuth();
    const [error, setError] = useState('')
    const navigate = useNavigate();

    async function handleLogOut (){
        setError('')
    
        try{
          await logOut()
          navigate("/signin")
        }catch{
          setError('Failed to log out')
        }
      }

  return (
    <div>
        <li>
            <NavLink to='/'>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink to='/music'>
                Music
            </NavLink>
        </li>

        <li>
            {currentUser?(
                <button onClick={handleLogOut}>
                    Log out
                </button>
            ):(
                <NavLink to='/signin'>
                    Sign in
                </NavLink>
            )}
           
        </li>
        
      





    </div>

    
  )
}

export default Navbar