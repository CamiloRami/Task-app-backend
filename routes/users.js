const express = require('express')
const UserService = require('../services/user')
const validatorHandler = require('../middlewares/validatorHandler')
const { createUserSchema, updateUserSchema, getUserSchema } = require('../schemas/user')
const { checkApiKey } = require('./../middlewares/authHandler')

const userService = new UserService()
const router = express.Router()

router.get('/', 
  checkApiKey,
  async (req, res, next) => {
    try {
      const users = await userService.getUsers()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/:id', 
  checkApiKey,
  validatorHandler(getUserSchema, 'params'), 
  async (req, res, next) => {
    try {
      const user = await userService.getUser(req.params.id)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/', 
  checkApiKey,
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body)
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id', 
  checkApiKey,
  validatorHandler(getUserSchema, 'params'), 
  validatorHandler(updateUserSchema, 'body'), 
  async (req, res, next) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', 
  checkApiKey,
  validatorHandler(getUserSchema, 'params'), 
  async (req, res, next) => {
    try {
      const { id } = req.params
      await userService.deleteUser(id)
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
