const LessonsModel = require('../../models/lessons')

module.exports = server => server.route({
  method: 'GET',
  path: '/lessons',
  handler: async (request, h) => {
    try {
      const lessonsAll = await LessonsModel.find({}).exec()
      return h.response(lessonsAll)
    } catch (error) {
      return h.response(error).code(500)
    }
  }
})
