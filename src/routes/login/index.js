const Bell = require('@hapi/bell')

const addLoginFacebook = require('./facebook')

const registerBell = async (server) => {
  await server.register(Bell)
}

module.exports = async (server) => {
  await registerBell(server)
  addLoginFacebook(server)
}
