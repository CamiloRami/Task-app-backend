const express = require('express')

const UserService = require('../services/user')

const userService = new UserService()
const router = express.Router()

router.get('/', async (req, res) => {
  const users = await userService.getUsers()
  res.status(200).json(users)
})

router.get('/:id', async (req, res) => {
  try {
    const users = await userService.getUser(req.params.id)
    res.status(200).json(users)
  } catch (error) {
    res.status(error.output.statusCode).json({
      message: error.message,
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await userService.createUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(error.output.statusCode).json({
      message: error.message,
    })
  }
})

module.exports = router