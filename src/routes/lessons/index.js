const LessonModel = require('../../models/LessonModel')

module.exports = (server) =>
  server.route({
    method: 'GET',
    path: '/lessons',
    handler: async (request, h) => {
      try {
        const lessonsAll = await LessonModel.find({}).exec()
        return h.response(lessonsAll)
      } catch (error) {
        return h.response(error).code(500)
      }
    },
  })
