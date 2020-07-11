'use strict'

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

const start = async () => {
  try {
    fastify.register(require('./routes'))

    await fastify.listen(process.env.APP_PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
