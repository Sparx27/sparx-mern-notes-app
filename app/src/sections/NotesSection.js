import { useEffect, useState } from 'react'
import axios from 'axios'
import NotesRender from '../components/NotesRender'
import NoteForm from '../components/NoteForm'
import './notesSection.css'
import NotesSearch from '../components/NotesSearch'

export default function NotesSection ({ user }) {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get('/api/notes')
      .then(response => setNotes(response.data))
  }, [])

  return (
    <div className='notesSection'>
      <h1><i>Public Notes</i></h1>
      <h3>Why taking notes only for you? Share them with everybody!</h3>

      <div className='completeForm'>
        {user === null && <p style={{ textAlign: 'center' }}><i>Login to create your notes</i></p>}
        {user !== null && <NoteForm notes={notes} setNotes={setNotes} user={user} />}

        <NotesSearch notes={notes} setNotes={setNotes} user={user} />
      </div>

      <NotesRender notes={notes} setNotes={setNotes} user={user} />
    </div>
  )
}
