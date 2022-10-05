require('dotenv').config()

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  versionApi: process.env.VERSION_API || '/api/v1',
  dbUri: process.env.DB_URI,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  whitelist: process.env.WHITELIST,
}

module.exports = config