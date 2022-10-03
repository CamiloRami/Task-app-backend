const Joi = require('joi')
const mongoose = require('mongoose')


const id = Joi.custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid')
  }
  return value
})
const email = Joi.string().email()
const password = Joi.string().min(8).max(64)
const name = Joi.string().min(6).max(64)

const createUserSchema = Joi.object({
  email: email.required(),
  name: name.required(),
  password: password.required(),
})

const updateUserSchema = Joi.object({
  email: email,
  name: name,
})

const getUserSchema = Joi.object({
  id: id.required(),
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
