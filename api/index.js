require('dotenv').config()
require('./mongodb')

const express = require('express')
const app = express()
const cors = require('cors')

const notesRouter = require('./controllers/notesRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))

app.use('/api/notes', notesRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use((err, req, res, next) => {
  console.log(err.name)

  if (err.name === 'CastError') res.status(400).send({ error: "Note's id does not exist" })
  else res.status(500).end()
})

const PORT = process.env.PORT || 5005
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
