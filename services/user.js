const userModel = require('../db/models/user')

class UserService {
  constructor() {}

  async addUser(user) {
    try {
      const newUser = new userModel(user)
      const userSaved = await newUser.save()
      return userSaved
    } catch (error) {
      throw new Error(`User not saved, ${error}`)
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
      throw new Error('User not found')
    }
  }
}

module.exports = UserService
