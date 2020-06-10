const GoalModel = require('../../models/GoalModel')

module.exports = (server) => {
  server.route({
    method: 'PATCH',
    path: '/api/goals/{id}',
    handler: async (request, h) => {
      const params = request.params
      const payload = request.payload

      if (!params.id) {
        return h.response('Id is required').code(500)
      }

      if (!payload.name) {
        return h
          .response(`Name is required string, but got ${typeof name}`)
          .code(500)
      }

      try {
        const result = await GoalModel.findByIdAndUpdate(
          { _id: params.id },
          {
            $set: {
              name: payload.name,
              description: payload.description,
            },
          }
        )
        return h.response(result)
      } catch (error) {
        return h.response(error).code(500)
      }
    },
  })
}
