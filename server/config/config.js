require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.serverUsername,
    "password": process.env.databasePassword,
    "database": process.env.databaseName,
    "host": process.env.serverHost,
    "dialect": process.env.serverDialect,
    "logging": false
  },
  "test": {
    "username": process.env.serverUsername,
    "password": process.env.databasePassword,
    "database": process.env.databaseName,
    "host": process.env.serverHost,
    "dialect": process.env.serverDialect,
    "logging": false
  },
  "production": {
    "username": process.env.serverUsername,
    "password": process.env.databasePassword,
    "database": process.env.databaseName,
    "host": process.env.serverHost,
    "dialect": process.env.serverDialect,
    "logging": false
  }
}
