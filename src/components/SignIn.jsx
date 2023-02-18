import React, {useState, useRef} from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'


const SignIn = () => {

    const emailRef = useRef()
    const passRef = useRef()
    const { signIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const navigate = useNavigate();
  

    async function handleSubmit(e) {
      e.preventDefault()
      try {
        await signIn(emailRef.current.value, passRef.current.value)
      } catch(error) {
        setError(error.code)
      }
      navigate('/')
    }






  return (
    <div className='signup__container'>
    <h1>Sign in</h1>
    {error && error}
    <form onSubmit={handleSubmit} className='signup__form' action="">
      <label htmlFor="form_email">Email</label>
      <input id='form_email' ref={emailRef} type="email" name='email' />
      <label htmlFor="form_password">Password</label>
      <input id='form_password' ref={passRef} type="password" name='password' />     
      <input disabled={loading} type="submit" value="Sign in" />
    </form>
    
     If you don't have an account <NavLink to='/signup'>Sign up</NavLink>

  </div>
  
  )
}

export default SignIn