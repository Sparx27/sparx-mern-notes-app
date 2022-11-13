import { useState } from 'react'
import { login } from '../services/login'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function LoginForm ({ setMessage, setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!username || !password) {
      setMessage('Username and password are required')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }

    try {
      const user = await login({
        username,
        password
      })

      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <Form
      onSubmit={handleLogin}
      style={{ width: '400px', padding: '15px', border: '1px solid #313847', borderRadius: '10px' }}
    >
      <Form.Group id='username'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text' value={username} onChange={(e) => setUsername(e.target.value)} required
          style={{ border: '1px solid #6da3da' }}
        />
      </Form.Group>
      <Form.Group id='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password' value={password} onChange={(e) => setPassword(e.target.value)} required
          style={{ border: '1px solid #6da3da' }}
        />
      </Form.Group>
      <div style={{ width: '70%', margin: '15px auto 0 auto' }}>
        <Button type='submit' variant='dark' style={{ width: '100%' }}>Login</Button>
      </div>
    </Form>
  )
}
