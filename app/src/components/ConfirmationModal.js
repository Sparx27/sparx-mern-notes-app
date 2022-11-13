import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'

export default function ConfirmationModal ({ show, setShow, notes, setNotes, user, id }) {
  const handleClose = () => setShow(false)

  const handleDelete = () => {
    const noteToDelete = notes.find(n => n.id === id)
    setNotes(notes.map(note => note.id !== noteToDelete.id ? note : ''))

    if (noteToDelete.user.username === user.username) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }

      axios.delete(`/api/notes/${id}`, config)
        .then(after => setShow(false))
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='alert alert-danger'>Are you sure you want to delete this note?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='light' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
