import React, {useRef, useState} from 'react'
import '../scss/main.scss'
import { useAuth } from '../contexts/AuthContext'
import * as Form from '@radix-ui/react-form';

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
      navigate('/')
    } catch{
      setError("Fail to create an account")
    }
    setLoading(false)
 
  }

  return (
    <div className='signup__container'>
      <h1>Sign up</h1>
      {error && error}



    <Form.Root onSubmit={handleSubmit} className="FormRoot">
    <Form.Field className="FormField" name="email">
      <div>
        <Form.Label className="form__label">Email</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="FormMessage" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input ref={emailRef} className="form__input" type="email" required />
      </Form.Control>
    </Form.Field>

    <Form.Field className="FormField" name="password">
      <div>
        <Form.Label className="form__label">Password</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter your password
        </Form.Message>     
      </div>
      <Form.Control asChild>
        <input ref={passRef} className="form__input" type="password" required />
      </Form.Control>
    </Form.Field>

    <Form.Field className="FormField" name="reapeatPassword">
      <div>
        <Form.Label className="form__label">Repeat password</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter your password
        </Form.Message>     
      </div>
      <Form.Control asChild>
      <input id='form_password_confirm' className="form__input" ref={repeatedPassRef} type="password" name='password_confirm' />
      </Form.Control>
    </Form.Field>
    
    <Form.Submit asChild>
      <button disabled={loading} className="button">
        Sign up
      </button>
    </Form.Submit>
  </Form.Root>


      {/* <form onSubmit={handleSubmit} className='signup__form' action="">
        <label htmlFor="form_email">Email</label>
        <input id='form_email' ref={emailRef} type="email" name='email' />
        <label htmlFor="form_password">Password</label>
        <input id='form_password' ref={passRef} type="password" name='password' />
        <label htmlFor="form_password_confirm">Password</label>
        <input id='form_password_confirm' ref={repeatedPassRef} type="password" name='password_confirm' />
        <input disabled={loading} type="submit" value="Sign up" />
      </form> */}
    </div>
  )
}

export default Signup