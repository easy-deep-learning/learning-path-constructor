/*
 * @see https://hapi.dev/api/?v=19.1.1#route-options
 *
 * */
module.exports = (server) =>
  server.route({
    method: 'GET',
    path: '/_template',
    handler: (/* request, h */) => {
      // 1 Parse request
      // Auth/ALC
      // Go to DB
      // Response!
    },
  })
