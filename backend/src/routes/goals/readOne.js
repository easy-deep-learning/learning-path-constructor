const GoalModel = require('../../models/GoalModel')

module.exports = (fastify) => {
  fastify.route({
    method: 'GET',
    path: '/api/goals/:id',
    handler: async (request) => {
      const params = request.params
      try {
        return await GoalModel.findOne({ _id: params.id })
          .populate({
            path: 'skills',
            limit: 5,
            populate: {
              path: 'lessons',
              limit: 5,
            },
          })
          .exec()
      } catch (error) {
        const err = new Error()
        err.statusCode = 500

        throw err
      }
    },
  })
}
