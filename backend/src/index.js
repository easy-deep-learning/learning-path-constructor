const fastify = require('fastify')({
  /**
   * @see https://www.fastify.io/docs/latest/Logging/
   */
  logger: {
    level: 'debug',
  },
})

const start = async () => {
  try {
    await require('./models')

    fastify.register(require('./sessions'))
    fastify.register(require('./routes'))

    await fastify.listen(process.env.APP_PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
