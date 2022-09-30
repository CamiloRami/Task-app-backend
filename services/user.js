const userModel = require('../db/models/user')
const boom = require('@hapi/boom')
class UserService {
  constructor() {}

  async createUser(user) {
    try {
      const newUser = new userModel(user)
      const userSaved = await newUser.save()
      return userSaved
    } catch (error) {
      throw boom.badRequest(`User not created, ${error}`)
    }
  }

  async getUsers() {
    const users = await userModel.find()
    return users
  }

  async getUser(id) {
    try{
      const user = await userModel.findById(id)
      return user
    }
    catch (error) {
      throw boom.notFound(`User not found, ${error}`)
    }
  }
}

module.exports = UserService
