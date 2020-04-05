const GoalModel = require('../../models/GoalModel')

module.exports = (server) =>
  server.route({
    method: 'POST',
    path: '/goals',
    handler: async (request, h) => {
      const payload = request.payload
      const newGoal = new GoalModel({
        name: payload.name,
      })

      try {
        await newGoal.save()
        return h.response(newGoal)
      } catch (error) {
        return h.response(error).code(500)
      }
    },
  })
