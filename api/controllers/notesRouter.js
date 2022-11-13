const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')
const userExtractor = require('../middlewares/userExtractor')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', {
    name: 1,
    username: 1
  })
  res.json(notes)
})

notesRouter.get('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params

  try {
    const note = await Note.findById(id).populate('user', {
      name: 1,
      username: 1
    })
    res.json(note)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

notesRouter.post('/', userExtractor, async (req, res, next) => {
  const { content, important = false } = req.body

  const { userId } = req

  const user = await User.findById(userId)

  if (!content) {
    return res.status(400).json({
      error: 'note content is missing'
    })
  }

  const note = new Note({
    content,
    important,
    date: new Date(),
    user: user._id
  })

  try {
    const savedNote = await (await note.save()).populate('user', {
      name: 1,
      username: 1
    })

    user.notes = user.notes.concat(savedNote.id)
    await user.save()

    res.json(savedNote)
  } catch (err) {
    next(err)
  }
})

notesRouter.put('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params
  const note = req.body

  const newNoteData = {
    content: note.content,
    important: note.important
  }

  try {
    const changedNote = await Note.findByIdAndUpdate(id, newNoteData, { new: true })
      .populate('user', {
        name: 1,
        username: 1
      })
    res.json(changedNote)
  } catch (error) {
    console.log(error)
  }
})

notesRouter.delete('/:id', userExtractor, async (req, res, next) => {
  const { id } = req.params

  Note.findByIdAndDelete(id)
    .then(result => {
      res.status(204).send({ status: 'Note deleted' })
    })
    .catch(err => next(err))
})

module.exports = notesRouter
