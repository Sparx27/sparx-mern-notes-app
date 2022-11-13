import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'

export default function RegisterSection () {
  const [message, setMessage] = useState(null)

  return (
    <div className='usersSection'>
      <h1>Register</h1>
      <div className='divMessage'>
        {
          !message
            ? ''
            : <h2>{message}</h2>
        }
      </div>
      <RegisterForm message={message} setMessage={setMessage} />
    </div>
  )
}
