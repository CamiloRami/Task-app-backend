const express = require('express')
const config = require('../config/config')
const usersRouter = require('./users')

function routerApi(app) {
  const router = express.Router()
  app.use(config.versionApi, router)
  router.use('/users' ,usersRouter)
}

module.exports = routerApi