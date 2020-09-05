/*
 * @see https://www.fastify.io/docs/latest/Routes/
 *
 * */
module.exports = (fastify) =>
  fastify.route({
    method: 'GET',
    path: '/_template',
    handler: (/* request, reply */) => {
      // 1 Parse request
      // Auth/ALC
      // Go to DB
      // Response!
    },
  })
