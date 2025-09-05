const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')

const app = express()

logger.info('connecting to Mongodb')

mongoose
    .connect(config.MONGODB_URI)
    .then( ()=> {
        logger.info('connected to Mongodb')
    })
    .catch((error) => {
        logger.error('error connecting to Mongodb:', error.message)
    })

app.use(express.json())

app.use('/api/', blogRouter)

app.use((error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
})

module.exports = app