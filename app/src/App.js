import { Route, Routes, Link } from 'react-router-dom'
import HomeSection from './sections/HomeSection'
import NotesSection from './sections/NotesSection'
import UsersSection from './sections/UsersSection'
import RegisterSection from './sections/RegisterSection'
import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import NotFound from './sections/NotFound'

function App () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

  const handleLogOut = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return (
    <div className='mainPage'>
      <Navbar bg='myBg' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand style={{ fontSize: '1.3rem', marginRight: '15px' }}>
            <Image src={require('./images/letter-s.png')} className='logo' />
            Sparx MERN Notes App
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link as={Link} to='/' style={{ fontSize: '1.3rem' }}>Home</Nav.Link>
              <Nav.Link as={Link} to='/notes' style={{ fontSize: '1.3rem' }}>Notes</Nav.Link>
              {user === null && <Nav.Link as={Link} to='/account' style={{ fontSize: '1.3rem' }}>Sign in</Nav.Link>}
              {user !== null && <Nav.Link disabled style={{ fontSize: '1.3rem', color: '#61dafb' }}>{user.name}</Nav.Link>}
              {user !== null && <Button variant='secondary' size='sm' onClick={handleLogOut}>Log out</Button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ paddingTop: '25px' }}>
        <Routes>
          <Route path='/' element={<HomeSection />} />
          <Route path='/notes' element={<NotesSection user={user} />} />
          <Route path='/account' element={<UsersSection user={user} setUser={setUser} />} />
          <Route path='/account/register' element={<RegisterSection />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
