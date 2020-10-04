module.exports = (fastify) => {
  fastify.route({
    method: 'GET',
    path: '/api/profile/:id',
    preValidation: (request, reply, done) => {
      console.log('request.session: ', request.session) // eslint-disable-line

      if (!request.session.userId) {
        reply.code(403).send({
          message: 'You are not logged in',
          redirectPath: '/login/',
        })
      } else {
        done()
      }
    },

    handler: async (request) => {
      const params = request.params
      return {
        dev: 'todo',
        params,
      }
    },
  })
}
