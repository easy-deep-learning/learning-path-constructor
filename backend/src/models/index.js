const mongoose = require('mongoose')
const composeMongoUrl = require('../utils/composeMongoUrl')
const { logger } = require('../logger')

/**
 * @see https://mongoosejs.com/docs/index.html
 */
const initMongo = async () => {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(
      `mongoose LOG: ${collectionName}.${method}`,
      JSON.stringify(query),
      doc
    )
  })

  const mongoUrl = await composeMongoUrl()

  // https://mongoosejs.com/docs/connections.html
  module.exports = mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const dbConnection = mongoose.connection

  dbConnection.on('error', (error) => {
    logger.error({
      eventName: 'mongodb connection error',
      error,
    })
  })
  dbConnection.once('open', () => {
    logger.info({
      eventName: 'mongodb connected',
    })
  })
}

;(async () => {
  initMongo()
})()
