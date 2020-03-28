const SkillModel = require('../../models/SkillModel')

module.exports = (server) =>
  server.route({
    method: 'GET',
    path: '/skills',
    handler: async (request, h) => {
      try {
        const skillsAll = await SkillModel.find({}).exec()
        return h.response(skillsAll)
      } catch (error) {
        return h.response(error).code(500)
      }
    },
  })
