const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Test Author',
    url: 'http://example.com/html',
    likes: 1,
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Another Author',
    url: 'http://example.com/js',
    likes: 2,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(b => b.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
