import React, {useState, useRef} from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
import * as Form from '@radix-ui/react-form';

const SignIn = () => {

    const emailRef = useRef()
    const passRef = useRef()
    const { signIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
  

    async function handleSubmit(e) {
      e.preventDefault()
      try {
        setLoading(true)
        await signIn(emailRef.current.value, passRef.current.value)
        navigate('/')
      } catch(error) {
        
        setError(error.code)
        setLoading(false)
      }
     
      
    }






  return (
    <div className='signup__container'>
    <h1>Sign in</h1>
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
    
    <Form.Submit asChild>
      <button disabled={loading} className="button">
        Sign in
      </button>
    </Form.Submit>
  </Form.Root>


    
     If you don't have an account <NavLink to='/signup'>Sign up</NavLink>

  </div>
  
  )
}

export default SignIn