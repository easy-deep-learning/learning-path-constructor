const UserModel = require('../../models/UserModel')
const SessionModel = require('../../models/SessionModel')

module.exports = (fastify) => {
  fastify.route({
    method: 'GET',
    path: '/api/profile/:userId',
    preValidation: async (request, reply, done) => {
      console.log('request.session: ', request.session) // eslint-disable-line
      const userDocument = await UserModel.findOne({
        _id: request.params.userId,
      })
      if (
        !userDocument ||
        !userDocument.activeSessionsIds.includes(request.session.id)
      ) {
        reply.code(403).send({
          message: 'You are not allowed to see this profile',
          redirectPath: '/',
        })
      } else {
        done()
      }
    },

    handler: async (request) => {
      const params = request.params
      const user = await UserModel.findOne({ _id: params.userId })

      return {
        dev: 'todo',
        user,
      }
    },
  })
}
