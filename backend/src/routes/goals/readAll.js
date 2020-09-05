const GoalModel = require('../../models/GoalModel')

module.exports = (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/api/goals',
    handler: async function handler() {
      try {
        return await GoalModel.find({})
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
