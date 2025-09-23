const express = require('express');
const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const Blog = require('./models/blog')

const app = express();

logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(err => logger.error('error connection to MongoDB:', err.message));

app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.get('/api/blogs', async (_req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !url) {
    return res.status(400).json({ error: 'title and url are required' })
  }

  const blog = new Blog(
    likes === undefined
      ? { title, author, url }
      : { title, author, url, likes }
  )

  const saved = await blog.save()
  res.status(201).json(saved)
})

module.exports = app;
