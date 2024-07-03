require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.serverUsername,
    "password": process.env.databasePassword,
    "database": process.env.databaseName,
    "host": process.env.serverHost,
    "dialect": process.env.serverDialect,
    dialectOptions: {
      ssl: {
        require: 'true'
      }
    },
    "logging": false
  },
  "test": {
    "username": process.env.serverUsername,
    "password": process.env.databasePassword,
    "database": process.env.databaseName,
    "host": process.env.serverHost,
    "dialect": process.env.serverDialect,
    dialectOptions: {
      ssl: {
        require: 'true'
      }
    },
    "logging": false
  },
  "production": {
    "username": process.env.serverUsername,
    "password": process.env.databasePassword,
    "database": process.env.databaseName,
    "host": process.env.serverHost,
    "dialect": process.env.serverDialect,
    dialectOptions: {
      ssl: {
        require: 'true'
      }
    },
    "logging": false
  }
}
