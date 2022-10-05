const express = require('express')
const db = require('./db')
const cors = require('cors')
const config = require('./config/config')
const routerApi = require('./routes')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler')

const app = express()

const options = {
  origin: (origin, callback) => {
    if (config.whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}
if (config.env === 'development') app.use(cors())
if (config.env === 'production') app.use(cors(options))

db(config.dbUri)

app.use(express.json())

require('./utils/auth')

routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(config.port)
