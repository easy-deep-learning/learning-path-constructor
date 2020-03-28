const GoalModel = require('../../models/GoalModel')

module.exports = (server) =>
  server.route({
    method: 'GET',
    path: '/goals',
    handler: async (request, h) => {
      try {
        const goalsAll = await GoalModel.find({}).exec()
        return h.response(goalsAll)
      } catch (error) {
        return h.response(error).code(500)
      }
    },
  })
