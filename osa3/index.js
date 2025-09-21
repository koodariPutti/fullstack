require('dotenv').config()
const express = require('express')
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const count = persons.length
  const time = new Date()
  response.send(`<p>Phonebook has info for ${count} people</p><p>${time}</p>`)
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(
        `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`
      )
    })
    .catch(next)
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (!person) return response.status(404).end()
      return response.json(person)
    })
    .catch(next)
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) return response.status(404).end()
      return response.status(204).end()
    })
    .catch(next)
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body
  const update = { name, number }

  Person.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
    context: 'query'
  })
    .then(updated => {
      if (!updated) return response.status(404).end()
      return response.json(updated)
    })
    .catch(next)
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  if (!name || !number) return response.status(400).json({ error: 'name or number missing' })
  Person.findOne({ name }).then(found=>{
    if (found) return response.status(409).json({ error: 'name must be unique' })
    return new Person({ name, number }).save().then(saved=>response.status(201).json(saved))
  }).catch(next)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


