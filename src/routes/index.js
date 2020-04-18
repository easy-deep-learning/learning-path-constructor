const makeRouters = async (server) => {
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
