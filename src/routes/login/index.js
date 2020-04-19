const Bell = require('@hapi/bell')
const addLoginFacebook = require('./facebook')

// TODO: usr internals = {}
// @see https://gist.github.com/hueniverse/a06f6315ea736ed1b46d

const registerBell = async (server) => {
  await server.register(Bell)
}

const authSessionMongoScheme = (server, options) => ({
  /**
   * @see https://hapi.dev/api/?v=19.1.1#authentication-scheme
   */

  // a lifecycle method function called for each incoming request
  authenticate: async (request, h) => {
    const sessionId = request.state.sessionId

    /*h.authenticated(data)
    h.unauthenticated(error, [data])*/
  },
  verify: async (auth) => {},
})

// TODO
const registerSessionMongo = (server) => {
  server.auth.scheme('session-mongo', authSessionMongoScheme)
}

module.exports = async (server) => {
  // https://hapi.dev/tutorials/cookies/
  // Cookie name for session
  server.state('sessionId', {
    isSecure: process.env.APP_PROTOCOL === 'https',
  })

  await registerBell(server)
  addLoginFacebook(server)
}
