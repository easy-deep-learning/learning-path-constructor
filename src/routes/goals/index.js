const GoalsModel = require('../../models/goals')

module.exports = server => server.route({
  method: 'GET',
  path: '/goals',
  handler: async(request, h) => {
    try {
      const goalsAll = await GoalsModel.find({}).exec()
      return h.response(goalsAll)

    } catch (error) {
      return h.response(error).code(500)
    }
  }
})
