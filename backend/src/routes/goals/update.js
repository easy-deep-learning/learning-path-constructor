const GoalModel = require('../../models/GoalModel')

module.exports = (fastify) => {
  fastify.route({
    method: 'PATCH',
    path: '/api/goals/:id',
    handler: async (request) => {
      const params = request.params
      const payload = request.body

      try {
        if (!params.id) {
          throw new Error()
        }

        if (!payload.name) {
          throw new Error()
        }

        return await GoalModel.findOneAndUpdate(
          { _id: params.id },
          {
            $set: {
              name: payload.name,
              description: payload.description,
            },
          },
          {
            new: true,
          }
        )
      } catch (error) {
        const err = new Error()
        err.statusCode = 500

        throw err
      }
    },
  })
}
