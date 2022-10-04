const express = require('express')
const config = require('../config/config')
const usersRouter = require('./users')
const tasksRouter = require('./tasks')

function routerApi(app) {
  const router = express.Router()
  app.use(config.versionApi, router)
  router.use('/users' ,usersRouter)
  router.use('/tasks' ,tasksRouter)
}

module.exports = routerApi