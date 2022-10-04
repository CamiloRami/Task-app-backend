const userModel = require('../db/models/user')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
class UserService {
  constructor() {}

  async createUser(user) {
    try {
      const hash = await bcrypt.hash(user.password, 10)
      const newUser = new userModel({...user, password: hash})
      const userSaved = await newUser.save()
      delete userSaved._doc.password
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
    return new Promise((resolve, reject) => {
      userModel.findById(id)
        .populate('tasks', 'description')
        .exec((error, user) => {
          if (error) {
            reject(boom.notFound(`User not found`))
          }
          resolve(user)
        })
    })
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
