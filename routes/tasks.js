const express = require('express')
const TaskService = require('../services/task')
const validatorHandler = require('../middlewares/validatorHandler')
const { createTaskSchema, updateTaskSchema, getTaskSchema } = require('../schemas/task')

const taskService = new TaskService()
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks()
    res.status(200).json(tasks)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', 
  validatorHandler(getTaskSchema, 'params'), 
  async (req, res, next) => {
    try {
      const task = await taskService.getTask(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.post('/', 
  validatorHandler(createTaskSchema, 'body'),
  async (req, res, next) => {
    try {
      const task = await taskService.createTask(req.body)
      res.status(201).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id', 
  validatorHandler(getTaskSchema, 'params'), 
  validatorHandler(updateTaskSchema, 'body'), 
  async (req, res, next) => {
    try {
      const task = await taskService.updateTask(req.params.id, req.body)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', 
  validatorHandler(getTaskSchema, 'params'), 
  async (req, res, next) => {
    try {
      const { id } = req.params
      await taskService.deleteTask(id)
      res.status(200).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
