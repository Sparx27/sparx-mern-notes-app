import './note.css'

export default function Note ({ note, user, toggleImportance, showModal }) {
  return (
    <>
      <div className='noteContent'>
        <span className={note.important ? 'important' : ''}>{note.content}</span>
        <br />
        <p className='author'>{new Date(note.date).toDateString()} <i>by: {note.user.name}</i></p>
      </div>
      <div className='noteOptions'>
        {
          user && note.user.username === user.username
            ? (
              <>
                <button className='btn-important' onClick={() => toggleImportance(note.id)}>
                  {note.important ? 'Not important' : 'Make Important'}
                </button>
                <button className='btn-delete' onClick={() => showModal(note.id)}>
                  <small>Delete 🗑️</small>
                </button>
              </>
              )
            : ''
        }
      </div>
    </>
  )
}
