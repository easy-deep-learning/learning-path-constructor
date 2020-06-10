const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const GoalSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
    },
  ],
})

/**
 * https://mongoosejs.com/docs/models.html
 */
const GoalModel = mongoose.model('Goal', GoalSchema)

module.exports = GoalModel
