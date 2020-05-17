'use strict'

const Hapi = require('@hapi/hapi')
const { logger } = require('./logger')

const makeRouters = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT,
    host: process.env.APP_HOST,
  })

  // Add logger
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: process.env.NODE_ENV !== 'production',
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      redact: ['req.headers.authorization'],
    },
  })

  await require('./models')

  await makeRouters(server)

  await server.start()
}

process.on('unhandledRejection', (error) => {
  logger.error(error)
  process.exit(1)
})

init()
