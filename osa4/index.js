require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/bloglist';

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((err) => {
    console.error('error connecting to MongoDB:', err.message);
  });

app.use(express.json());

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

app.post('/api/blogs', async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
