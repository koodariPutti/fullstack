const { describe, test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');           
const Blog = require('../models/blog');  
const helper = require('./test_helper'); 

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogeilla on kenttä id', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blog = res.body[0]
  assert.ok(blog.id, 'id puuttuu palautetusta blogista')
  assert.strictEqual(blog._id, undefined)
})

test('uuden blogin voi lisätä POSTilla', async () => {
  const newBlog = {
    title: 'Testi-postaus',
    author: 'kooda',
    url: 'https://example.com/testi',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Testi-postaus'))
})

test('likes kenttä oletetaan nollaksi jos sitä ei anneta', async () => {
  const newBlog = {
    title: 'Ilman likejä',
    author: 'Testi',
    url: 'https://example.com/ilman-likeja'
  }

  const res = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.likes, 0)

  const blogsAtEnd = await helper.blogsInDb()
  const added = blogsAtEnd.find(b => b.title === 'Ilman likejä')
  assert.strictEqual(added.likes, 0)
})

test('POST palauttaa 400 jos title puuttuu', async () => {
  const newBlog = {
    author: 'No Title',
    url: 'https://example.com/notitle',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('POST palauttaa 400 jos url puuttuu', async () => {
  const newBlog = {
    title: 'No URL',
    author: 'No Url',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

describe('GET /api/blogs', () => {
  test('returns JSON and correct count', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });
});

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('deletion of a blog', () => {
    test('succeeds with status 204 when id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(!titles.includes(blogToDelete.title))
    })

    test('fails with status 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()
      await api
        .delete(`/api/blogs/${validNonExistingId}`)
        .expect(404)
    })

    test('fails with status 400 if id is invalid', async () => {
      const invalidId = '12345abcde'
      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })
})

after(async () => {
  await mongoose.connection.close();
});
