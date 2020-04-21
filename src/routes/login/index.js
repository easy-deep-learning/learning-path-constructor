const Bell = require('@hapi/bell')
const SessionModel = require('../../models/SessionModel')
const addLoginFacebook = require('./facebook')

// TODO: usr internals = {}
// @see https://gist.github.com/hueniverse/a06f6315ea736ed1b46d

const registerBell = async (server) => {
  await server.register(Bell)
}

const authSessionMongoScheme = (/*server, options*/) => ({
  /**
   * @see https://hapi.dev/api/?v=19.1.1#authentication-scheme
   */

  // a lifecycle method function called for each incoming request
  authenticate: async (request, h) => {
    const sessionCookieId = request.state.sessionId

/*    if (!sessionCookieId) {
      return h.redirect('/login/facebook')
    }*/

    const session = await SessionModel.findOne({ sessionCookieId }).exec()
    
    console.log('session: ', session); // eslint-disable-line

    if (session) {
      return h.authenticated(session)
    } else {
      return h.unauthenticated(new Error('TODO: Boom the error'))
    }
  },
  verify: async (auth) => {
    console.log('auth: ', auth); // eslint-disable-line
  },
})

// TODO
const registerSessionMongo = (server) => {
  server.auth.scheme('session-mongo-scheme', authSessionMongoScheme)
  server.auth.strategy('session-mongo', 'session-mongo-scheme')
}

module.exports = async (server) => {
  // https://hapi.dev/tutorials/cookies/
  // Cookie name for session
  server.state('sessionId', {
    isSecure: process.env.APP_PROTOCOL === 'https',
    path: '/',
  })

  await registerBell(server)
  await registerSessionMongo(server)
  addLoginFacebook(server)
}
