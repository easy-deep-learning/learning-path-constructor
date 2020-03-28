const mongoose = require('mongoose')
const composeMongoUrl = require('../utils/composeMongoUrl')

/**
 * @see https://mongoosejs.com/docs/index.html
 */
const initMongo = async () => {
  const mongoUrl = await composeMongoUrl()

  // https://mongoosejs.com/docs/connections.html
  module.exports = mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const dbConnection = mongoose.connection

  dbConnection.on('error', console.error.bind(console, 'connection error:'))
  dbConnection.once('open', function () {
    console.log('mongodb connected') // eslint-disable-line
  })
}

;(async () => {
  initMongo()
})()
