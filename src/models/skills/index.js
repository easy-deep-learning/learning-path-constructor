const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const SkillsSchema = Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  }
})

/**
 * https://mongoosejs.com/docs/models.html
 */
const SkillsModel = mongoose.model('skills', SkillsSchema)

module.exports = SkillsModel
