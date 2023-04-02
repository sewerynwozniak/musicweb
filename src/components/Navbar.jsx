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



      const menuList = [
        {
            key:1,
            name:'Home',
            path:'/',

        },
        {
            key:2,
            name:'Music',
            path:'/music',

        }
     

    ]



  return (
    <div className='nav__wrapper'>
     
        {menuList.map(menu=>(
            <li>
                <NavLink className='nav__a' to={menu.path}>
                    {menu.name}
                </NavLink>
            </li>
        ))}


        <li>
            {currentUser?(
                <button onClick={handleLogOut}>
                    Log out
                </button>
            ):(
                <NavLink className='nav__a' to='/signin'>
                    Sign in
                </NavLink>
            )}
           
        </li>
        


    </div>

    
  )
}

export default Navbar