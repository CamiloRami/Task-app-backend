const taskModel = require('../db/models/task')
const userModel = require('../db/models/user')
const boom = require('@hapi/boom')
class TaskService {
  constructor() {}

  async createTask(task) {
    try {
      const newTask = new taskModel(task)
      const taskSaved = await newTask.save()
      const user = await userModel.findById(task.user)
      user.tasks.push(taskSaved._id)
      await user.save()
      return taskSaved
    } catch (error) {
      throw boom.badRequest(`Task not created, ${error}`)
    }
  }
  async getTasks() {
    const tasks = await taskModel.find()
    return tasks
  }
  async getTask(id) {
    return new Promise((resolve, reject) => {
      taskModel.findById(id)
        .populate('user', 'name email')
        .exec((error, task) => {
          if (error) {
            reject(boom.notFound(`Task not found`))
          }
          resolve(task)
        })
    })
  } 
  async updateTask(id, changes) { 
    try {
      const taskUpdated = await taskModel.findByIdAndUpdate(id, changes)
      if (!taskUpdated) {
        throw boom.notFound()
      }
      return taskUpdated
    } catch (error) {
      throw boom.notFound(`Task not found`)
    }
  }
  async deleteTask(id) {
    try{
      const taskDeleted = await taskModel.findByIdAndDelete(id)
      if (!taskDeleted) {
        throw boom.notFound()
      }
      const user = await userModel.findById(taskDeleted.user)
      user.tasks = user.tasks.filter(task => task != id)
      await user.save()
      return taskDeleted
    }
    catch (error) {
      throw boom.notFound(`Task not found`)
    }
  }

}

module.exports = TaskService
