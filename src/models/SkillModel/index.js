const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const SkillSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  ],
})

/**
 * https://mongoosejs.com/docs/models.html
 */
const SkillModel = mongoose.model('Skill', SkillSchema)

module.exports = SkillModel
