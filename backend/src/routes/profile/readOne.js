const UserModel = require('../../models/UserModel')
const SessionModel = require('../../models/SessionModel')

module.exports = (fastify) => {
  fastify.route({
    method: 'GET',
    path: '/api/profile/:id',
    preValidation: async (request, reply, done) => {
      console.log('request.session: ', request.session) // eslint-disable-line

      const session = await SessionModel.findOne({
        sessionCookieId: request.session.sessionCookieId,
      })
      const user = await UserModel.findOne({ _id: session.userId })

      if (!user || user._id !== request.session.userId) {
        reply.code(403).send({
          message: 'You are not allowed to see profile',
          redirectPath: '/',
        })
      } else {
        done()
      }
    },

    handler: async (request) => {
      const params = request.params
      const user = await UserModel.findOne({ _id: params.id })

      return {
        dev: 'todo',
        user,
      }
    },
  })
}
