const Bell = require('@hapi/bell')

const addLoginFacebook = require('./facebook')

const registerBell = async (server) => {
  await server.register(Bell)
}

module.exports = (server) => {
  registerBell(server)
  addLoginFacebook(server)
}
