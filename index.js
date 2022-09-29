const express = require('express')
const app = express()
const db = require('./db')
const config = require('./config/config')

const UserService = require('./services/user')
const userService = new UserService()

db(config.dbUri)

app.use(express.json())

app.get('/users', async (req, res) => {
  const users = await userService.getUsers()
  res.status(200).json(users)
})

app.get('/users/:email', async (req, res) => {
  try {
    const users = await userService.getUser(req.params.email)
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({
      message: error.message,
    })
  }
})

app.post('/users', async (req, res) => {
  try {
    const user = await userService.addUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
})

app.listen(config.port)
