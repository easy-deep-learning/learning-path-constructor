module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/profile/{id}',
    /* TODO
    config: {
      auth: 'session-mongo',
      mode: 'required',
    },
    */
    handler: async (request, h) => {
      const params = request.params

      return h.response(`profile ${params.id}`)
    },
  })
}
