import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

import './usersSection.css'

export default function UsersSection ({ user, setUser }) {
  const [message, setMessage] = useState(null)

  return (
    <div className='usersSection'>
      {
        user === null
          ? (
            <>
              <h1>Login</h1>
              <div className='divMessage'>
                {!message
                  ? ''
                  : <h2>{message}</h2>}
              </div>
              <LoginForm setMessage={setMessage} setUser={setUser} />
              <h2>Don't have an account? <Link to='/account/register'><i>Sign Up</i></Link></h2>
            </>
            )
          : <Navigate replace to='/notes' />
      }
    </div>
  )
}
