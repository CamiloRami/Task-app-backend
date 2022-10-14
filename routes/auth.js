const express = require('express')
const passport = require('passport')
const AuthService = require('./../services/auth')
const { checkApiKey } = require('./../middlewares/authHandler')
const validatorHandler = require('./../middlewares/validatorHandler')
const { createUserSchema} = require('./../schemas/user')

const authService = new AuthService()
const router = express.Router()


router.post('/login',
  checkApiKey,
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      res.json(authService.signToken(req.user))
    } catch (error) {
      next(error)
    }
  }
)

router.post('/signup',
  checkApiKey,
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = await authService.signUp(req.body)
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
