const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (_req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (err) {
    next(err);
  }
});

blogsRouter.post('/', async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body
    if (!title || !url) {
      return res.status(400).json({ error: 'title and url are required' })
    }
    const blog = new Blog({ title, author, url, likes });
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err); 
}
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).end()
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
