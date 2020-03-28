const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const LessonSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
})

/**
 * https://mongoosejs.com/docs/models.html
 */
const LessonModel = mongoose.model('Lesson', LessonSchema)

module.exports = LessonModel
