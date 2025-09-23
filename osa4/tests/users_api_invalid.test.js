const { describe, beforeEach, test } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

describe('invalid user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    await new User({ username: 'root', passwordHash }).save()
  })

  test('fails with 400 if username too short', async () => {
    const start = await helper.usersInDb()
    const newUser = { username: 'ab', name: 'Too Short', password: 'validpw' }

    const res = await api.post('/api/users').send(newUser).expect(400)
    assert.match(res.body.error, /username/i)

    const end = await helper.usersInDb()
    assert.strictEqual(end.length, start.length)
  })

  test('fails with 400 if password too short', async () => {
    const start = await helper.usersInDb()
    const newUser = { username: 'validuser', name: 'X', password: '12' }

    const res = await api.post('/api/users').send(newUser).expect(400)
    assert.match(res.body.error, /password/i)

    const end = await helper.usersInDb()
    assert.strictEqual(end.length, start.length)
  })

  test('fails with 400 if username not unique', async () => {
    const start = await helper.usersInDb()
    const dup = { username: 'root', name: 'Dup', password: 'salasana' }

    const res = await api.post('/api/users').send(dup).expect(400)
    assert.match(res.body.error, /unique|duplicate/i)

    const end = await helper.usersInDb()
    assert.strictEqual(end.length, start.length)
  })
})
