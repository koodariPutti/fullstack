const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

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

blogsRouter.post('/', async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body
    if (!title || !url) {
      return res.status(400).json({ error: 'title and url are required' })
    }

    const user = await User.findOne({})
    if (!user) {
      return res.status(400).json({ error: 'no users available' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes ?? 0,
      user: user._id,
    })

    const saved = await blog.save()

    user.blogs = user.blogs.concat(saved._id)
    await user.save()

    const populated = await saved.populate('user', { username: 1, name: 1 })
    res.status(201).json(populated)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter;
