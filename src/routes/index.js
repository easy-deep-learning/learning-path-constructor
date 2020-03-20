const makeRouters = server => {
  /* Root */
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!'
    }
  })

  /* Goals */
  require('./goals')(server)

  /* Lessons */
  require('./lessons')(server)

  /* Skills */
  require('./skills')(server)
}

module.exports = makeRouters
