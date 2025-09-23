const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    if (!username || username.length < 3) {
      return res.status(400).json({ error: 'username must be at least 3 characters' })
    }

    if (!password || password.length < 3) {
      return res.status(400).json({ error: 'password must be at least 3 characters' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })  // blogit näkyviin
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Poista kaikki käyttäjät (varovasti!)
usersRouter.delete('/', async (_req, res) => {
  await User.deleteMany({})
  res.status(204).end()
})


module.exports = usersRouter
