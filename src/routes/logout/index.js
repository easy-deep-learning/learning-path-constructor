module.exports = (server) =>
  server.route({
    method: 'GET',
    path: '/logout',
    config: {
      auth: false,
    },
    handler: async (request, h) => {
      request.auth.session.clear()
      h.redirect('/')
    },
  })
