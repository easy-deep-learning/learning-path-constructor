const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const LessonsSchema = Schema({
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
const LessonsModel = mongoose.model('lessons', LessonsSchema)

module.exports = LessonsModel
