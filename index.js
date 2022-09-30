const express = require('express')
const db = require('./db')
const config = require('./config/config')
const routerApi = require('./routes')
const app = express()

db(config.dbUri)

app.use(express.json())

routerApi(app)

app.listen(config.port)
