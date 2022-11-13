const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    date: 1
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const users = await User.findOne({ username })
  if (users) {
    res.status(400).send({ error: 'username already taken' })
  } else {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      name,
      passwordHash
    })

    const newUser = await user.save()
    res.json(newUser)
  }
})

module.exports = usersRouter
