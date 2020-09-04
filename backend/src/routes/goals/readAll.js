const GoalModel = require('../../models/GoalModel')

module.exports = (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/api/goals',
    handler: async function handler(request, reply) {
      try {
        const goalsAll = await GoalModel.find({})
          /*          .populate({
            path: 'skills',
            limit: 5,
            populate: {
              path: 'lessons',
              limit: 5,
            },
          })*/
          .exec()

        return goalsAll
      } catch (error) {
        console.log('error: ', error) // eslint-disable-line

        const err = new Error()
        err.statusCode = 500

        throw err
      }
    },
  })
}
