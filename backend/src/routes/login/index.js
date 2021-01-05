module.exports = (fastify) => {
  fastify.route({
    method: 'GET',
    path: '/login',
    handler: (request, reply) => {
      reply.send({
        loginPaths: ['/login/facebook'],
      })
    },
  })

  require('./facebook')(fastify)
}
