'use strict'

const Hapi = require('@hapi/hapi')

const makeRouters = require('./routes')

const init = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT,
    host: process.env.APP_HOST
  })

  await require('./models')

  makeRouters(server)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
