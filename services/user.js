const userModel = require('../db/models/user')
const boom = require('@hapi/boom')
// const bcrypt = require('bcrypt')
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
      if (!user) {
        throw boom.notFound()
      }
      return user
    }
    catch (error) {
      throw boom.notFound(`User not found`)
    }
  }

  async updateUser(id, changes) {
    try {
      const userUpdated = await userModel.findByIdAndUpdate(id, changes)
      if (!userUpdated) {
        throw boom.notFound()
      }
      return userUpdated
    } catch (error) {
      throw boom.notFound(`User not found`)
    }
  }

  async deleteUser(id) {
    try{
      const userDeleted = await userModel.findByIdAndDelete(id)
      if (!userDeleted) {
        throw boom.notFound()
      }
      return userDeleted
    }
    catch (error) {
      throw boom.notFound(`User not found`)
    }
  }
}

module.exports = UserService
