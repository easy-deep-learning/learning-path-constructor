module.exports = (fastify) =>
  fastify.route({
    method: 'GET',
    path: '/logout',
    config: {
      auth: false,
    },
    handler: async () => {
      // TODO
      return { dev: 'todo' }
    },
  })
