require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body', request => JSON.stringify(request.body))

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan(':method :url :body'))
app.use(cors())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
      response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
  

app.get('/info' , (request, response) => {
  const date = new Date().toString()
  Person.countDocuments().then(count => {
    response.send(`<p>Phonebook has info for ${count} people at ${date}`)
  })
  }
)

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(
    response.status(204).end()
  )
})

const generateId = () => {
  const newId = Math.floor((Math.random() *(200 - 5) + 5))
  return String(newId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: 'misssing data'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  
  Person.findById(request.params.id)
    .then(person => {
      if(body.name === person.name){
        person.name = body.name
        person.number = body.number
      }

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}` )
})