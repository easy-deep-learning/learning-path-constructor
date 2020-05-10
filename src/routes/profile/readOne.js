module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/profile/{id}',
    options: {
      auth: {
        strategy: 'session-mongo',
        mode: 'try',
      },
    },
    handler: async (request, h) => {
      const params = request.params

      if (request.auth.isAuthenticated) {
        return h.response(`profile ${params.id}`)
      } else {
        return h.redirect('/login')
      }
    },
  })
}
