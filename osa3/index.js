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



let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

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

app.get('/api/persons/:id', (request, response) => {
  const id = String(request.params.id)
  const person = persons.find(p => p.id === id)
  if (!person) return response.status(404).end()
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(deleted => {
      if (!deleted) {
        return response.status(404).end()
      }
      return response.status(204).end()
    })
    .catch(error => {
      console.error(error.message)
      return response.status(400).json({ error: 'error deleting person' })
    })
})


app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name || !number) {
    return response.status(400).json({ error: 'name or number missing' })
  }

  const person = new Person({ name, number })

  person.save().then(saved => {
    response.status(201).json(saved)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


