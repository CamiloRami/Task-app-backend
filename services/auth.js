const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('./../config/config')

const UserService = require('./user')
const userService = new UserService()

class AuthService {
  constructor() {}

  async getUser(email, password) {
    try {
      const user = await userService.getUserByEmail(email)
      if (!user) {
        throw boom.unauthorized('Invalid credentials')
      }
      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        throw boom.unauthorized('Invalid credentials')
      }
      delete user._doc.password
      return user
    } catch (error) {
      throw boom.unauthorized('Invalid credentials')
    }
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      email: user.email,
    }
    const token = jwt.sign(payload, config.jwtSecret)
    return {
      user,
      token,
    }
  }
}

module.exports = AuthService
