const SkillModel = require('../../models/SkillModel')

module.exports = (fastify) =>
  fastify.route({
    method: 'GET',
    path: '/api/skills',
    handler: async () => {
      try {
        return await SkillModel.find({}).exec()
      } catch (error) {
        const err = new Error()
        err.statusCode = 500

        throw err
      }
    },
  })
