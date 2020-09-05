const GoalModel = require('../../models/GoalModel')

module.exports = (fastify) => {
  fastify.route({
    method: 'POST',
    path: '/api/goals',
    handler: async (request) => {
      const payload = request.body
      const newGoal = new GoalModel({
        name: payload.name,
      })

      try {
        await newGoal.save()
        return await newGoal.save()
      } catch (error) {
        const err = new Error()
        err.statusCode = 500

        throw err
      }
    },
  })
}
