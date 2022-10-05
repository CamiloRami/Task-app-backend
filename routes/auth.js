const express = require('express')
const passport = require('passport')
const AuthService = require('./../services/auth')
const { checkApiKey } = require('./../middlewares/authHandler')

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

module.exports = router
