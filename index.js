const express = require('express')
const app = express()
const db = require('./db')
const config = require('./config/config')
const routerApi = require('./routes')

db(config.dbUri)

app.use(express.json())

routerApi(app)

app.listen(config.port)
