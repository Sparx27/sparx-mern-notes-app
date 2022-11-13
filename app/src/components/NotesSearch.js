import axios from 'axios'
import Form from 'react-bootstrap/Form'
import './notesSearch.css'
import { useRef } from 'react'

export default function NotesSearch ({ notes, setNotes, user }) {
  const radioAll = useRef(null)
  const radioPersonal = useRef(null)
  const noteFilter = useRef(null)

  const renderAll = (e) => {
    noteFilter.current.value = ''
    axios.get('/api/notes')
      .then(response => setNotes(response.data))
  }

  const renderPersonal = (e) => {
    if (noteFilter.current.value !== '' && noteFilter.current.value !== null) {
      noteFilter.current.value = ''
      axios.get('/api/notes')
        .then(response => setNotes(response.data.filter(note => note.user.name === user.name)))
    } else {
      noteFilter.current.value = ''
      if (!user) {
        return null
      }
      setNotes(notes.filter(note => note.user.name === user.name))
    }
  }

  const handleFilter = async (e) => {
    if (user) {
      radioPersonal.current.checked = false
    }
    axios.get('/api/notes')
      .then(response => {
        return setNotes(response.data.filter(note => {
          return note.user.name.toLowerCase().includes(e.target.value.toLowerCase())
        }))
      })
  }

  return (
    <Form
      className='smallForm'
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15px',
        border: '1px solid #313847',
        borderRadius: '10px',
        backgroundColor: '#282c34',
        color: 'white'
      }}
    >
      {
          user
            ? (
              <div className='options'>
                <Form.Check
                  type='radio'
                  id='allNotes'
                  label='Show all notes'
                  name='radio'
                  onChange={renderAll}
                  ref={radioAll}
                />
                <Form.Check
                  type='radio'
                  label='Show my notes'
                  id='personalNotes'
                  name='radio'
                  onChange={renderPersonal}
                  ref={radioPersonal}
                />
              </div>
              )
            : null
        }

      <div className='options'>
        <p style={{ margin: '0', padding: '0' }}>Search notes by user's name</p>
        <Form.Group>
          <Form.Control
            id='username' type='text' onChange={handleFilter} ref={noteFilter}
            style={{ border: '1px solid #6da3da' }}
          />
        </Form.Group>
      </div>
    </Form>
  )
}
