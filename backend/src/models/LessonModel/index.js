const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const LessonSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
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
