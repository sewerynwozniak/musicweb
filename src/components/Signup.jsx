import React, {useRef, useState} from 'react'
import '../scss/main.scss'
import { useAuth } from '../contexts/AuthContext'

const Signup = () => {

  const emailRef = useRef()
  const passRef = useRef()
  const repeatedPassRef = useRef()
  const { signUp, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState('')

  async function handleSubmit(e){
    e.preventDefault();

    if(passRef.current.value!==repeatedPassRef.current.value){
      return setError('Passwords do not match')
    }

    try{
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passRef.current.value)
    } catch{
      setError("Fail to create an account")
    }
    setLoading(false)
    console.log('success')
  }

  return (
    <div className='signup__container'>
      <h1>Sign up</h1>
      {error && error}
      {currentUser && currentUser.email}
      <form onSubmit={handleSubmit} className='signup__form' action="">
        <label htmlFor="form_email">Email</label>
        <input id='form_email' ref={emailRef} type="email" name='email' />
        <label htmlFor="form_password">Password</label>
        <input id='form_password' ref={passRef} type="password" name='password' />
        <label htmlFor="form_password_confirm">Password</label>
        <input id='form_password_confirm' ref={repeatedPassRef} type="password" name='password_confirm' />
        <input disabled={loading} type="submit" value="Sign up" />
      </form>
    </div>
  )
}

export default Signup