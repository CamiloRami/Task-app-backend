require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  versionApi: process.env.VERSION_API || '/api/v1',
  dbUri: process.env.DB_URI,
}

module.exports = config