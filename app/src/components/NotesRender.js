import axios from 'axios'
import Note from './Note'
import ConfirmationModal from './ConfirmationModal'
import { useState } from 'react'
import './notesRender.css'

export default function NotesRender ({ notes, setNotes, user }) {
  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    if (note.user.username === user.username) {
      const changedNote = { ...note, important: !note.important }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      axios.put(`/api/notes/${id}`, changedNote, config)
        .then(response => {
          setNotes(notes.map(note => note.id !== id ? note : response.data))
        })
    }
  }

  const [show, setShow] = useState(false)
  const [noteId, setNoteId] = useState('')
  const showModal = (id) => {
    setNoteId(id)
    setShow(true)
  }

  return (
    <div style={{ width: '100%', marginTop: '15px' }}>
      {notes.map(note => {
        if (!note.id || note.show === 0) return ''
        else {
          return (
            <div className='noteContainer' key={note.id}>
              <Note user={user} note={note} toggleImportance={toggleImportance} showModal={showModal} />
            </div>
          )
        }
      })}

      <ConfirmationModal show={show} setShow={setShow} notes={notes} setNotes={setNotes} user={user} id={noteId} />
    </div>
  )
}
