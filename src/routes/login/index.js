const Bell = require('@hapi/bell')

const addLoginFacebook = require('./facebook')

const registerBell = async (server) => {
  await server.register(Bell)
}

// TODO
/*const registerSessionMongo = (server) => {

}*/

module.exports = async (server) => {
  // https://hapi.dev/tutorials/cookies/
  // Cookie name for session
  server.state('sessionId', {
    isSecure: process.env.APP_PROTOCOL === 'https',
  })

  await registerBell(server)
  addLoginFacebook(server)
}
