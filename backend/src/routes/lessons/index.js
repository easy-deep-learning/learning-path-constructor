const LessonModel = require('../../models/LessonModel')

module.exports = (fastify) =>
  fastify.route({
    method: 'GET',
    path: '/api/lessons',
    handler: async () => {
      try {
        return await LessonModel.find({}).exec()
      } catch (error) {
        const err = new Error()
        err.statusCode = 500

        throw err
      }
    },
  })
