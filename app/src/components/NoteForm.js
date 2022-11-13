import { useState } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function NoteForm ({ notes, setNotes, user }) {
  const [newNote, setNewNote] = useState('')

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const noteObject = {
      content: newNote
    }

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }

    axios.post('/api/notes', noteObject, config)
      .then(response => (response.data))
      .then(addNote => setNotes([...notes, addNote]))

    setNewNote('')
  }

  return (
    <>
      <h4 style={{ textAlign: 'center', textDecoration: 'underline' }}>Create a new note</h4>
      <Form onSubmit={handleSubmit} style={{ marginBottom: '25px' }}>
        <Form.Group id='createNote'>
          <Form.Control
            type='text' value={newNote} onChange={handleChange}
            style={{ border: '1px solid #6da3da' }}
          />
        </Form.Group>
        <div style={{ width: '35%', margin: '15px auto 0 auto' }}>
          <Button type='submit' variant='dark' style={{ width: '100%' }}>Add</Button>
        </div>
      </Form>
    </>
  )
}
