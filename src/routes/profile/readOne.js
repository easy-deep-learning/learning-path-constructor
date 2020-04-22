module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/profile/{id}',
    config: {
      auth: 'session-mongo',
    },
    handler: async (request, h) => {
      const params = request.params

      const credentials = await request.server.auth.verify(request)
      console.log('credentials: ', credentials) // eslint-disable-line

      if (request.auth.isAuthenticated) {
        return h.response(`profile ${params.id}`)
      } else {
        return h.status(403)
      }
    },
  })
}
