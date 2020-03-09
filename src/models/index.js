const mongoose = require('mongoose')

/**
 * @see https://mongoosejs.com/docs/index.html
 */

// https://mongoosejs.com/docs/index.html
mongoose.connect(process.env.MONGO_INITDB_DATABASE, { useNewUrlParser: true })
const dbConnection = mongoose.connection

dbConnection.on('error', console.error.bind(console, 'connection error:'))
dbConnection.once('open', function () {
  console.log('mongodb connected'); // eslint-disable-line
})
