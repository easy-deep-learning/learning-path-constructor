const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const GoalsSchema = Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true
  }
})

const GoalsModel = mongoose.model('goals', GoalsSchema)

module.exports = GoalsModel
