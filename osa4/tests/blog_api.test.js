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

describe('GET /api/blogs', () => {
  test('returns JSON and correct count', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(res.body.length, helper.initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
