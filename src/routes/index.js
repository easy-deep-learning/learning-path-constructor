const Boom = require('@hapi/boom')

const SessionModel = require('../models/SessionModel')

const authSessionMongoScheme = (/*server, options*/) => {
  return {
    /**
     * @see https://hapi.dev/api/?v=19.1.1#authentication-scheme
     */
    authenticate: async (request, h) => {
      const sessionCookieId = request.state.sessionId
      if (!sessionCookieId) {
        return h.unauthenticated(Boom.unauthorized(null, 'cookie'))
      }

      const session = await SessionModel.findOne({ sessionCookieId }).exec()

      if (session) {
        const { _id, userId, isActive } = session

        return h.authenticated({
          credentials: {
            _id,
            userId,
            isActive,
          },
        })
      } else {
        return h.unauthenticated(Boom.unauthorized(null, 'session'))
      }
    },
  }
}

// TODO
const registerSessionMongo = (server) => {
  server.auth.scheme('session-mongo-scheme', authSessionMongoScheme)
  server.auth.strategy('session-mongo', 'session-mongo-scheme', {})
}

const makeRouters = async (server) => {
  // https://hapi.dev/tutorials/cookies/
  // Cookie name for session
  server.state('sessionId', {
    isSecure: process.env.APP_PROTOCOL === 'https',
    path: '/',
  })

  await registerSessionMongo(server)

  /* Root */
  server.route({
    method: 'GET',
    path: '/',
    handler: (/* request, h */) => {
      return 'Hello World!'
    },
  })

  /* Login */
  await require('./login')(server)

  /* Logout */
  require('./logout')(server)

  /* Goals */
  require('./goals')(server)

  /* Lessons */
  require('./lessons')(server)

  /* Skills */
  require('./skills')(server)

  /* Profile */
  require('./profile')(server)
}

module.exports = makeRouters
