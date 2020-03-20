const internalIp = require('internal-ip')

const getConfig = async () => {
  // Mongo in Docker
  const hostIp = await internalIp.v4()
  const mongoUrl = `mongodb://${process.env.APP_MONGO_USER}:${process.env.APP_MONGO_PASS}@${hostIp}:${process.env.MONGO_PORT}/${process.env.APP_MONGO_DB}`
  return {
    mongodb: {
      url: mongoUrl,
      databaseName: process.env.APP_MONGO_DB,
      options: {
        useNewUrlParser: true, // removes a deprecation warning when connecting
        useUnifiedTopology: true // removes a deprecating warning when connecting
        //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
        //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
      }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: 'migrations',

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog'
  }
}

// Return the config as a promise
module.exports = getConfig()
