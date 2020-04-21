module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/profile/{id}',
    config: {
      auth: 'session-mongo',
    },
    handler: async (request, h) => {
      const params = request.params

      return h.response(`profile ${params.id}`)
    },
  })
}
