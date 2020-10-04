// our-first-route.js

async function routes(fastify) {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: async function handler() {
      return { hello: 'world 1' }
    },
  })

  require('./goals')(fastify)
  require('./lessons')(fastify)
  require('./skills')(fastify)
  require('./login')(fastify)
  require('./profile')(fastify)
}

module.exports = routes
