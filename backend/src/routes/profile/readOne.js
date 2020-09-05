module.exports = (fastify) => {
  fastify.route({
    method: 'GET',
    path: '/profile/:id',
    handler: async (request) => {
      const params = request.params
      return {
        dev: 'todo',
        params,
      }
    },
  })
}
