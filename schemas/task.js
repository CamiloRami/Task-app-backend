const Joi = require('joi')
const mongoose = require('mongoose')


const id = Joi.custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid')
  }
  return value
})
const user = Joi.custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid')
  }
  return value
})
const description = Joi.string().min(1).max(255)

const createTaskSchema = Joi.object({
  user: user.required(),
  description: description.required(),
})

const updateTaskSchema = Joi.object({
  description: description,
})

const getTaskSchema = Joi.object({
  id: id.required(),
})

module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema }
