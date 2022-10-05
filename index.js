const express = require('express')
const db = require('./db')
const config = require('./config/config')
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler')

const app = express()

db(config.dbUri)

app.use(express.json())

require('./utils/auth')

routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(config.port)
