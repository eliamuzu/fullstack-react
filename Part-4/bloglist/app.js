const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

const app = express()

//connection to the database
logger.info('connecting to Mongodb')
mongoose
    .connect(config.MONGODB_URI)
    .then( ()=> {
        logger.info('connected to Mongodb')
    })
    .catch((error) => {
        logger.error('error connecting to Mongodb:', error.message)
    })

//Middleware
app.use(express.json())

//access to routes
app.use('/api', blogRouter)
app.use('/api', userRouter)

app.use((error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
})

module.exports = app