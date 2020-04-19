const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const SessionSchema = Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  sessionCookieId: String,

  isActive: Boolean,
  userId: Schema.Types.ObjectId,
  device: String,
  ip: String,

  createdAt: Date,
  updatedAt: Date,
})

/**
 * https://mongoosejs.com/docs/models.html
 */
const SessionModel = mongoose.model('Session', SessionSchema)

module.exports = SessionModel
