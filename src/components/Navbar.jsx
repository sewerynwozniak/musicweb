import React from 'react'
import { NavLink} from 'react-router-dom';

 



const Navbar = () => {
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
            <NavLink to='/signup'>
                Sign up
            </NavLink>
        </li>
        
      





    </div>

    
  )
}

export default Navbar