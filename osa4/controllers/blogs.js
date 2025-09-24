const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (_req, res, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body
  if (!title || !url) return res.status(400).json({ error: 'title and url are required' })

  try {
    const decoded = jwt.verify(req.token, process.env.SECRET)
    if (!decoded.id) return res.status(401).json({ error: 'token invalid' })

    const user = await User.findById(decoded.id)
    if (!user) return res.status(400).json({ error: 'UserId missing or not valid' })

    const blog = new Blog({ title, author, url, likes: likes ?? 0, user: user._id })
    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()

    res.status(201).json(saved)
  } catch (_e) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  let decoded
  try {
    decoded = jwt.verify(req.token, process.env.SECRET)
  } catch (_e) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(204).end()

  if (blog.user && blog.user.toString() !== decoded.id.toString()) {
    return res.status(401).json({ error: 'only the creator can delete a blog' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  return res.status(204).end()
})


module.exports = blogsRouter;
