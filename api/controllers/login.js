const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!passwordCorrect) {
      res.status(401).json({ error: 'invalid user or password' })
    } else {
      const userForToken = {
        id: user._id,
        username: user.username
      }

      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60 * 24 * 3
      })

      res.send({
        name: user.name,
        username: user.username,
        token
      })
    }
  } catch (error) {
    res.send(400).send({ error: 'Wrong credentials' })
  }
})

module.exports = loginRouter
