const GoalModel = require('../../models/GoalModel')

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/api/goals/{id}',
    handler: async (request, h) => {
      const params = request.params
      try {
        const goalOne = await GoalModel.findOne({ _id: params.id })
          .populate({
            path: 'skills',
            limit: 5,
            populate: {
              path: 'lessons',
              limit: 5,
            },
          })
          .exec()
        return h.response(goalOne)
      } catch (error) {
        return h.response(error).code(500)
      }
    },
  })
}
