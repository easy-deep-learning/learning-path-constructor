const mongoose = require('mongoose')
const internalIp = require('internal-ip')

/**
 * @see https://mongoosejs.com/docs/index.html
 */
const initMongo = async () => {
  // Mongo in Docker
  const hostIp = await internalIp.v4()
  const mongoUrl = `mongodb://${process.env.APP_MONGO_USER}:${process.env.APP_MONGO_PASS}@${hostIp}:${process.env.MONGO_PORT}/${process.env.APP_MONGO_DB}`

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
