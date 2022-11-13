import axios from 'axios'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function UserForm ({ setMessage }) {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handlePassword1 = (e) => {
    setPassword1(e.target.value)
  }

  const handlePassword2 = (e) => {
    setPassword2(e.target.value)
  }

  const formSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      setMessage("Password doesn't match")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } else {
      const userObject = {
        username,
        name,
        password
      }

      axios.post('/api/users', userObject)
        .then(response => response.data)
        .then(action => {
          setMessage('User register successful')
          setTimeout(() => {
            setMessage(null)
          }, 3500)
          setUsername('')
          setName('')
          setPassword1('')
          setPassword2('')
        })
    }
  }

  return (
    <Form
      onSubmit={formSubmit}
      style={{ width: '400px', padding: '15px', border: '1px solid #313847', borderRadius: '10px' }}
    >
      <Form.Group id='regusername'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text' value={username} onChange={handleUsername} required
          style={{ border: '1px solid #6da3da' }}
        />
      </Form.Group>
      <Form.Group id='regname'>
        <Form.Label>Public name</Form.Label>
        <Form.Control
          type='text' value={name} onChange={handleName} required
          style={{ border: '1px solid #6da3da' }}
        />
      </Form.Group>
      <Form.Group id='regpassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password' value={password} onChange={handlePassword1} required
          style={{ border: '1px solid #6da3da' }}
        />
      </Form.Group>
      <Form.Group id='regconfirmpassword'>
        <Form.Label>Confirm your password</Form.Label>
        <Form.Control
          type='password' value={password2} onChange={handlePassword2} required
          style={{ border: '1px solid #6da3da' }}
        />
      </Form.Group>
      <div style={{ width: '70%', margin: '15px auto 0 auto' }}>
        <Button type='submit' variant='dark' style={{ width: '100%' }}>Register</Button>
      </div>
    </Form>
  )
}
