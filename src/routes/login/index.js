const Bell = require('@hapi/bell')
const addLoginFacebook = require('./facebook')

// TODO: use internals = {}
// @see https://gist.github.com/hueniverse/a06f6315ea736ed1b46d

const registerBell = async (server) => {
  await server.register(Bell)
}

module.exports = async (server) => {
  server.route({
    method: 'GET',
    path: '/login',
    handler: async (request, h) => {
      return h.redirect('/login/facebook')
    },
  })

  await registerBell(server)
  addLoginFacebook(server)
}
