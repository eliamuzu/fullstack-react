const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//route for creating a user
usersRouter.post('/users', async (request, response) => {
    const { username, name , password } = request.body

    //encrypting plain text password before storing in the database
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

    module.exports = userRouter
})

//route for retrieving all users in the database
usersRouter.get('/users', async (request, response) => {
    const users = await User.find({})

    response.json(users)
})