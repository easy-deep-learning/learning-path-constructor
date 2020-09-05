const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * https://mongoosejs.com/docs/schematypes.html#schematypes
 */
const SessionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  sessionCookieId: String,

  isActive: Boolean,
  userId: Schema.Types.ObjectId,
  userAgent: String,
  host: String,

  createdAt: Date,
  updatedAt: Date,
})

/**
 * https://mongoosejs.com/docs/models.html
 */
const SessionModel = mongoose.model('Session', SessionSchema)

module.exports = SessionModel
