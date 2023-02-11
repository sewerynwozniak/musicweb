import React, {useRef} from 'react'
import '../scss/main.scss'

const Signup = () => {

  const emailRef = useRef()
  const passRef = useRef()
  const repeatedPassRef = useRef()

  return (
    <div className='signup__container'>
      <h1>Sign up</h1>
      <form className='signup__form' action="">
        <label htmlFor="form_email">Email</label>
        <input id='form_email' ref={emailRef} type="email" name='email' />
        <label htmlFor="form_password">Password</label>
        <input id='form_password' ref={passRef} type="password" name='password' />
        <label htmlFor="form_password_confirm">Password</label>
        <input id='form_password_confirm' ref={repeatedPassRef} type="password" name='password_confirm' />
        <input type="submit" value="Sign up" />
      </form>
    </div>
  )
}

export default Signup