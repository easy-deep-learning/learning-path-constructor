const GoalModel = require('../../models/GoalModel')

module.exports = (server) => {
  /**
   * read All
   */
  server.route({
    method: 'GET',
    path: '/goals',
    handler: async (request, h) => {
      try {
        const goalsAll = await GoalModel.find({})
          .populate({
            path: 'skills',
            limit: 5,
            populate: {
              path: 'lessons',
              limit: 5,
            },
          })
          .exec()
        return h.response(goalsAll)
      } catch (error) {
        return h.response(error).code(500)
      }
    },
  })

  /**
   * create One
   */
  require('./create')(server)
}
