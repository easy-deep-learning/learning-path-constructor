const fastify = require('fastify')({ logger: true })

const start = async () => {
  try {
    await require('./models')

    fastify.register(require('./sessions'))

    fastify.addHook('preHandler', function (request, reply, next) {
      console.log('request.session.userId: ', request.session.userId) // eslint-disable-line
      next()
    })

    fastify.register(require('./routes'))

    await fastify.listen(process.env.APP_PORT)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
