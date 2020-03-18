const mongoose = require('mongoose')

/**
 * @see https://mongoosejs.com/docs/index.html
 */

// https://mongoosejs.com/docs/connections.html
module.exports = mongoose.connect(
    `mongodb://localhost:${process.env.MONGO_PORT}/`,
    {
      useNewUrlParser: true,
      user: process.env.APP_MONGO_USER,
      pass: process.env.APP_MONGO_PASS,
      dbName: process.env.APP_MONGO_DB,
    },
)
const dbConnection = mongoose.connection

dbConnection.on('error', console.error.bind(console, 'connection error:'))
dbConnection.once('open', function () {
  console.log('mongodb connected') // eslint-disable-line
})
